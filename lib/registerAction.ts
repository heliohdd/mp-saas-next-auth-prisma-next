"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";

export default async function registerAction(
  _prevState: any,
  formData: FormData
) {
  const entries = Array.from(formData.entries());
  const data = Object.fromEntries(entries) as {
    name: string;
    email: string;
    password: string;
  };

  console.log("==== Server Action Register User ====");
  console.log(data);

  // Se não tiver "Nome", "Email" ou "Senha", retornar erro
  if (!data.name || !data.email || !data.password) {
    return { message: "Preencha todos os campos!!!", success: false };
  }

  // Se um usuário já existir, retornar erro
  const user = await db.user.findUnique({ where: { email: data.email } });

  if (user) {
    return { message: "Este usuário já existe", success: false };
  }

  // Se usuário não existir no banco de dados criar novo usuário
  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashSync(data.password),
    },
  });

  return { message: "Usuário criado com sucesso", success: true };
}
