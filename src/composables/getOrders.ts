import { ref, watchEffect } from "vue";
import { db } from "../firebase/config";
import { collection, onSnapshot, query, where } from "firebase/firestore";

const getCollection = (c: string, q: [string, string, string]) => {
  const documents = ref(null);

  // collection reference
  let colRef = collection(db, c);

  if (q) {
    console.log(...q);
    colRef = query(colRef, where(...q));
  }

  const unsub = onSnapshot(colRef, (snapshot) => {
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
