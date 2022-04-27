import { ref } from "vue";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const error = ref();
const isPending = ref(false);

const signup = async (email: string, password: string) => {
  error.value = null;
  isPending.value = true;

  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    if (!res) {
      throw new Error("Could not complete signup");
    }

    error.value = null;
    isPending.value = false;
  } catch (e: any) {
    console.log(">>>>", typeof e.message);
    console.log(e.message);
    if (e.message.includes("Password")) {
      error.value = "Password must contain at least 6 characters";
    } else if (e.message.includes("email-already")) {
      error.value = "E-mail already registered";
    } else if (e.message.includes("invalid-email")) {
      error.value = "Invalid email";
    } else {
      error.value = "There is a problem, please try again later.";
    }

    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, isPending, signup };
};

export default useSignup;
