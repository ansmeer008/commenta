/**
 * Import function triggers from their respective submodules:
 *
 * import {onCall} from "firebase-functions/v2/https";
 * import {onDocumentWritten} from "firebase-functions/v2/firestore";
 *
 * See a full list of supported triggers at https://firebase.google.com/docs/functions
 */

import { setGlobalOptions } from "firebase-functions";
// import { onRequest } from "firebase-functions/https";
// import * as logger from "firebase-functions/logger";
import * as functions from "firebase-functions";
import * as admin from "firebase-admin";

admin.initializeApp();

// Start writing functions
// https://firebase.google.com/docs/functions/typescript

// For cost control, you can set the maximum number of containers that can be
// running at the same time. This helps mitigate the impact of unexpected
// traffic spikes by instead downgrading performance. This limit is a
// per-function limit. You can override the limit for each function using the
// `maxInstances` option in the function's options, e.g.
// `onRequest({ maxInstances: 5 }, (req, res) => { ... })`.
// NOTE: setGlobalOptions does not apply to functions using the v1 API. V1
// functions should each use functions.runWith({ maxInstances: 10 }) instead.
// In the v1 API, each function can only serve one request per container, so
// this will be the maximum concurrent request count.
setGlobalOptions({ maxInstances: 10 });

// export const helloWorld = onRequest((request, response) => {
//   logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

export const updateUserInCommentaries = functions.firestore.onDocumentUpdated(
  "users/{userId}",
  async event => {
    const newData = event.data?.after?.data();
    // const oldData = event.data?.before?.data();
    const userId = event.params.userId;

    if (!newData) return;

    const { nickName, profileUrl } = newData;

    const snapshot = await admin
      .firestore()
      .collection("commentaries")
      .where("authorId", "==", userId)
      .get();

    const batch = admin.firestore().batch();

    snapshot.forEach(doc => {
      const updateData: Record<string, any> = {};

      if (nickName !== undefined) {
        updateData.authorNickName = nickName;
      }
      if (profileUrl !== undefined) {
        updateData.authorProfileUrl = profileUrl;
      }

      if (Object.keys(updateData).length > 0) {
        batch.update(doc.ref, updateData);
      }
    });

    return batch.commit();
  }
);
