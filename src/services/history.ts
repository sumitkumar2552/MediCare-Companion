import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase";

export async function getMedicationHistory(uid: string) {
  const q = query(
    collection(db, "medications"),
    where("uid", "==", uid)
  );

  const snap = await getDocs(q);

  return snap.docs.map(d => d.data());
}
