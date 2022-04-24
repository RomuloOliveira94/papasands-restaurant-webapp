import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDxGA08NDJn2bz_mu3cqjZmwFtQJZgIQjE",
  authDomain: "papasand-s.firebaseapp.com",
  projectId: "papasand-s",
  storageBucket: "papasand-s.appspot.com",
  messagingSenderId: "773969562362",
  appId: "1:773969562362:web:0547ee747a7b42a5465743",
};

initializeApp(firebaseConfig);
const auth = getAuth();

export { auth };
