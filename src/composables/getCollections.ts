import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const getCollection = (c: string, uid?: string) => {
  const documents = ref();
  const collectionRef = collection(db, c);
  let q;

  if (uid) {
    q = query(collectionRef, where("userUid", "==", uid));
  } else {
    q = query(collectionRef);
  }

  const unsub = onSnapshot(q, (snapshot) => {
    const results: { id: string }[] | null = [];
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });

    documents.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};

export default getCollection;
