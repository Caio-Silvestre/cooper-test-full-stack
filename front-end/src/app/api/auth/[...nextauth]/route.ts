import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import axios from "axios";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";

console.log("🔧 NextAuth API URL:", process.env.NEXT_PUBLIC_API_URL);
console.log("🔧 NextAuth URL:", process.env.NEXTAUTH_URL);
console.log(
  "🔧 NextAuth Secret:",
  process.env.NEXTAUTH_SECRET ? "Definido" : "Não definido"
);

type CustomSession = Session & {
  accessToken?: string;
  error?: string;
};

async function refreshAccessToken(token: JWT): Promise<JWT> {
  try {
    console.log("🔄 Tentando renovar token...");
    const response = await axios.post(
      `http://coopersbackend:3001/auth/refresh`,
      {
        refresh_token: token.refreshToken,
      }
    );
    const data = response.data;
    console.log("✅ Token renovado com sucesso");
    return {
      ...token,
      accessToken: data.access_token,
      refreshToken: data.refresh_token ?? token.refreshToken,
      accessTokenExpires: Date.now() + (data.expires_in || 60 * 60) * 1000,
      user: data.user ?? token.user,
    };
  } catch (error) {
    console.error("❌ Erro ao renovar token:", error);
    return { ...token, error: "RefreshAccessTokenError" };
  }
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          console.log("🔧 NextAuth - Iniciando authorize...");
          console.log(
            "🔧 NextAuth - Fazendo login para:",
            `${"http://coopersbackend:3001"}/auth/login`
          );
          console.log("🔧 NextAuth - Credenciais:", {
            email: credentials?.email,
            password: credentials?.password,
          });

          console.log("🔧 NextAuth - Fazendo requisição axios...");
          const response = await axios.post(
            `http://coopersbackend:3001/auth/login`,
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              timeout: 10000,
              headers: {
                "Content-Type": "application/json",
              },
            }
          );

          console.log("🔧 NextAuth - Resposta recebida com sucesso!");
          console.log("🔧 NextAuth - Resposta do backend:", response.data);

          if (
            response.data &&
            response.data.user &&
            response.data.access_token
          ) {
            console.log("✅ NextAuth - Login bem-sucedido, retornando usuário");
            return {
              ...response.data.user,
              accessToken: response.data.access_token,
              refreshToken: response.data.refresh_token,
              accessTokenExpires:
                Date.now() + (response.data.expires_in || 60 * 60) * 1000, // Usar expires_in do backend
            };
          }

          console.log("❌ NextAuth - Resposta inválida do backend");
          return null;
        } catch (error: unknown) {
          const errorMessage =
            error instanceof Error ? error.message : "Erro desconhecido";
          console.error("❌ NextAuth - Erro na requisição:", errorMessage);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60, // 1h
  },
  jwt: {
    secret: process.env.NEXTAUTH_SECRET,
  },
  callbacks: {
    async jwt({ token, user }) {
      // Login inicial
      if (user) {
        const customUser = user as typeof user & {
          accessToken: string;
          refreshToken: string;
          accessTokenExpires: number;
        };
        console.log("🔑 Login inicial - token criado");
        return {
          ...token,
          accessToken: customUser.accessToken,
          refreshToken: customUser.refreshToken,
          accessTokenExpires: customUser.accessTokenExpires,
          user: customUser,
        };
      }

      // Verificar se há erro de refresh
      if (token.error === "RefreshAccessTokenError") {
        console.log("❌ Erro de refresh detectado, redirecionando para login");
        return { ...token, error: "RefreshAccessTokenError" };
      }

      // Token ainda válido (com margem de 30 segundos)
      if (Date.now() < (token.accessTokenExpires as number) - 30 * 1000) {
        return token;
      }

      // Token expirado ou próximo de expirar: tentar refresh
      console.log("⏰ Token próximo de expirar, renovando...");
      return await refreshAccessToken(token);
    },
    async session({ session, token }) {
      const user = token.user as
        | { name?: string; email?: string; image?: string }
        | undefined;

      session.user = {
        name: user?.name,
        email: user?.email,
        image: user?.image,
      };

      const customSession: CustomSession = {
        ...session,
        accessToken: token.accessToken as string,
        error: token.error as string,
      };

      // Se há erro de refresh, retornar session vazia (será tratado pelo cliente)
      if (token.error === "RefreshAccessTokenError") {
        console.log("🚪 Erro de refresh na session");
        customSession.error = "RefreshAccessTokenError";
      }

      return customSession;
    },
  },
  pages: {
    signIn: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
});

export { handler as GET, handler as POST };
