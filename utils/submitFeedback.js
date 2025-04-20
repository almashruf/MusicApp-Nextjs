import { db } from "../firebase/config";
import { collection, addDoc, Timestamp } from "firebase/firestore";

export const submitFeedback = async (userId, feedbackText) => {
  await addDoc(collection(db, "feedback"), {
    userId,
    feedbackText,
    createdAt: Timestamp.now(),
  });
};