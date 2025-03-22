"use server";

import db from "@/lib/db";

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

  // Se usuário não existir no banco de dados criar novo usuário
  await db.user.create({
    data: {
      name: data.name,
      email: data.email,
      password: data.password,
    },
  });
}
