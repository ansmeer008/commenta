import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { UserData } from "@/store/authStore";
import { Timestamp } from "firebase-admin/firestore";
import { verifyAuth } from "@/lib/server/auth";

export async function GET(req: NextRequest, context: any) {
  const { uid, error } = await verifyAuth(req);
  if (!uid) return error!;
  try {
    const { uid } = await context.params;

    const userDoc = await adminDb.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data() as UserData;

    const subscribes = userData.subscribes || [];

    if (subscribes.length === 0) {
      return NextResponse.json({ success: true, data: [] }, { status: 200 });
    }

    // 구독 정보 + 상세 카테고리 정보 병합
    const data = await Promise.all(
      subscribes.map(async subscribe => {
        const categoryDoc = await adminDb.collection("categories").doc(subscribe.id).get();
        const detail = categoryDoc.exists ? { id: categoryDoc.id, ...categoryDoc.data() } : null;
        return { ...subscribe, detail };
      })
    );

    return NextResponse.json({ success: true, data }, { status: 200 });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, context: any) {
  const { uid, error } = await verifyAuth(req);
  if (!uid) return error!;
  try {
    const { uid } = await context.params;
    const body = await req.json();

    const { id, episode } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userRef = adminDb.collection("users").doc(uid);
    const categoryRef = adminDb.collection("categories").doc(id);

    await adminDb.runTransaction(async t => {
      const userDoc = await t.get(userRef);
      const categoryDoc = await t.get(categoryRef);

      if (!userDoc.exists) {
        throw new Error("User not found");
      }
      if (!categoryDoc.exists) {
        throw new Error("Category not found");
      }

      const now = Timestamp.now();
      const userData = userDoc.data() || {};
      const subscribes = (userData.subscribes || []) as any[];

      if (subscribes.find(s => s.id === id)) {
        throw new Error("ALREADY_SUBSCRIBED");
      }

      if (subscribes.length >= 10) {
        throw new Error("LIMIT_EXCEEDED");
      }

      // 새로운 구독 추가
      subscribes.push({
        id,
        episode,
        createdAt: now,
        updatedAt: now,
      });

      // 카테고리 구독자 수 증가
      t.update(categoryRef, {
        subscribeCount: (categoryDoc.data()?.subscribeCount || 0) + 1,
      });

      t.update(userRef, { subscribes });
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error subscribing category:", error);

    if (error.message === "ALREADY_SUBSCRIBED") {
      return NextResponse.json({ success: false, error: "Already Subscribed" }, { status: 400 });
    }

    if (error.message === "LIMIT_EXCEEDED") {
      return NextResponse.json(
        { success: false, error: "Subscribe limit exceeded (max 10)" },
        { status: 400 }
      );
    }

    if (error.message === "User not found" || error.message === "Category not found") {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }

    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest, context: any) {
  const { uid, error } = await verifyAuth(req);
  if (!uid) return error!;
  try {
    const { uid } = await context.params;
    const body = await req.json();
    const { id, episode } = body;

    if (!id || episode === undefined) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userRef = adminDb.collection("users").doc(uid);
    const categoryRef = adminDb.collection("categories").doc(id);

    await adminDb.runTransaction(async t => {
      const userDoc = await t.get(userRef);
      const categoryDoc = await t.get(categoryRef);

      if (!userDoc.exists) throw new Error("User not found");
      if (!categoryDoc.exists) throw new Error("Category not found");

      const userData = userDoc.data() || {};
      const subscribes = (userData.subscribes || []) as any[];

      const index = subscribes.findIndex(s => s.id === id);
      if (index === -1) throw new Error("SUBSCRIBE_NOT_FOUND");

      // 구독 정보 수정 (episode 업데이트)
      subscribes[index] = {
        ...subscribes[index],
        episode,
        updatedAt: Timestamp.now(),
      };

      t.update(userRef, { subscribes });
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error updating subscription:", error);

    if (error.message === "User not found" || error.message === "Category not found") {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }
    if (error.message === "SUBSCRIBE_NOT_FOUND") {
      return NextResponse.json({ success: false, error: "Subscribe not found" }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest, context: any) {
  const { uid, error } = await verifyAuth(req);
  if (!uid) return error!;
  try {
    const { uid } = await context.params;
    const body = await req.json();
    const { id } = body;

    if (!id) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const userRef = adminDb.collection("users").doc(uid);
    const categoryRef = adminDb.collection("categories").doc(id);

    await adminDb.runTransaction(async t => {
      const userDoc = await t.get(userRef);
      const categoryDoc = await t.get(categoryRef);

      if (!userDoc.exists) throw new Error("User not found");
      if (!categoryDoc.exists) throw new Error("Category not found");

      const userData = userDoc.data() || {};
      const subscribes = (userData.subscribes || []) as any[];

      const index = subscribes.findIndex(s => s.id === id);
      if (index === -1) throw new Error("SUBSCRIBE_NOT_FOUND");

      // 구독 제거
      subscribes.splice(index, 1);

      // 카테고리 구독자 수 감소
      const newCount = Math.max((categoryDoc.data()?.subscribeCount || 1) - 1, 0);
      t.update(categoryRef, { subscribeCount: newCount });
      t.update(userRef, { subscribes });
    });

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error("Error deleting subscription:", error);

    if (error.message === "User not found" || error.message === "Category not found") {
      return NextResponse.json({ success: false, error: error.message }, { status: 404 });
    }
    if (error.message === "SUBSCRIBE_NOT_FOUND") {
      return NextResponse.json({ success: false, error: "Subscribe not found" }, { status: 400 });
    }

    return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
  }
}
