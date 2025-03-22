import Credentials from "next-auth/providers/credentials";
import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      authorize: async (credentials) => {
        console.log(credentials);
        // Lógica de autenticação
        // Se não autenticado retorna 'null'
        // Se autenticado retorna 'user'

        return {
          name: "Helio",
          email: "helio@teste.com",
          password: "asdçfklj",
        };
      },
    }),
  ],
});
