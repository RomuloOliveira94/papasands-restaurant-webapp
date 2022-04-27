import { ref } from "vue";
import { auth } from "../firebase/config";
import { signInWithEmailAndPassword } from "firebase/auth";

const error = ref();
const isPending = ref(false);

const login = async (email: string, password: string) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("Could not login");
    }

    error.value = null;
    isPending.value = false;
  } catch (err: any) {
    if (err.message.includes("user-not-found")) {
      error.value = "User not found";
    } else if (err.message.includes("wrong-password")) {
      error.value = "Wrong password";
    } else {
      error.value = "There is a problem, please try again later.";
    }
    isPending.value = false;
  }
};

const uselogin = () => {
  return { error, login, isPending };
};

export default uselogin;
