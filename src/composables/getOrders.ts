import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const getCollection = (c: string, q: string) => {
  const documents = ref();
  // collection reference
  const collectionRef = collection(db, c);

  if (q) {
    console.log(...q);
    const search = query(collectionRef, where("userUid", "==", q));
  }

  const unsub = onSnapshot(collectionRef, (snapshot) => {
    const results: { id: string }[] | null = [];
    snapshot.docs.forEach((doc) => {
      results.push({ ...doc.data(), id: doc.id });
    });

    // update values
    documents.value = results;
  });

  watchEffect((onInvalidate) => {
    onInvalidate(() => unsub());
  });

  return { documents };
};

export default getCollection;
