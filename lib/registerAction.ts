"use server";

import db from "@/lib/db";
import { hashSync } from "bcrypt-ts";

export default async function registerAction(formData: FormData) {
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
    throw new Error("Você precisa passar todos os dados!!!");
  }

  // Se um usuário já existir, retornar erro
  const user = await db.user.findUnique({ where: { email: data.email } });

  if (user) {
    throw new Error("Usuário já existe.");
  }

  // Se usuário não existir no banco de dados criar novo usuário
  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashSync(data.password),
    },
  });
}
