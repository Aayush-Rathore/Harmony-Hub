import { auth } from "../backend/Firebase";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { toast } from "react-toastify";

// Function to sign up a user
export const SignUpFun = async (values) => {
  try {
    const { email, password } = values;

    // Create a new user with email and password
    const UserData = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Send email verification to the newly registered user
    await sendEmailVerification(UserData.user).then(() => {
      toast.success("Check your inbox to verify Email!");
    });
  } catch (e) {
    if (e.code === "auth/email-already-in-use") {
      toast.warn("Email is already in use!");
    } else {
      console.log(e);
    }
  }
};

// Function to log in a user
export const LoginFun = async (values) => {
  try {
    const { email, password } = values;

    // Sign in the user with email and password
    const UserData = await signInWithEmailAndPassword(auth, email, password);

    // Check if the user's email is verified
    if (!UserData.user.emailVerified) {
      // If email is not verified, prompt the user to verify it and resend verification email
      toast.warn("Please verify your email first!");
      await sendEmailVerification(UserData.user).then(() => {
        toast.success("Check your inbox to verify Email!");
      });
    } else {
      // If email is verified, return the user data
      return UserData.user;
    }
  } catch (e) {
    if (e.code === "auth/invalid-credential") {
      toast.warn("Check your email or password!");
    }
  }
};
