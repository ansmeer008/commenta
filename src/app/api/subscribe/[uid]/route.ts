import { NextRequest, NextResponse } from "next/server";
import { adminDb } from "@/lib/admin";
import { UserData } from "@/store/authStore";
import { Timestamp } from "firebase-admin/firestore";

export async function GET(req: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const { uid } = await params;

    const userDoc = await adminDb.collection("users").doc(uid).get();

    if (!userDoc.exists) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const userData = userDoc.data() as UserData;

    // subscribes 없거나 빈 배열일 경우
    if (!userData.subscribes || userData.subscribes.length === 0) {
      return NextResponse.json({ categories: [] });
    }

    const categories = await Promise.all(
      userData.subscribes.map(async subscribe => {
        const doc = await adminDb.collection("categories").doc(subscribe.id).get();
        return doc.exists ? { id: doc.id, ...doc.data() } : null;
      })
    );

    return NextResponse.json({ data: categories });
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: { uid: string } }) {
  try {
    const { uid } = await params;
    const body = await req.json();

    const { id, episode } = body;

    if (!id || !episode) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
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

      const existingIndex = subscribes.findIndex(s => s.id === id);

      if (existingIndex > -1) {
        return NextResponse.json({ error: "Already Subscribed" }, { status: 400 });
      } else {
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
      }
      t.update(userRef, { subscribes });
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Error creating commentary:", error);
    return NextResponse.json({ error: "Server error" }, { status: 500 });
  }
}
