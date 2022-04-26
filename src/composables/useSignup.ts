import { ref } from "vue";
import { auth } from "../firebase/config";
import { createUserWithEmailAndPassword } from "firebase/auth";

const error = ref(null);
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
  } catch (err: any) {
    console.log(err.message);
    error.value = err.message;
    isPending.value = false;
  }
};

const useSignup = () => {
  return { error, isPending, signup };
};

export default useSignup;
