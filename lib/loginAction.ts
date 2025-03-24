"use server";

import { signIn } from "@/auth";
import { errorMonitor } from "stream";

export default async function loginAction(_prevState: any, formData: FormData) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirect: false,
    });
    return { success: true };
  } catch (e) {
    if (e.type === "CredentialsSignin") {
      return { success: false, message: "Dados de login incorretos." };
    }
    return { success: false, message: "Oops, algum erro aconteceu!" };
  }
}
