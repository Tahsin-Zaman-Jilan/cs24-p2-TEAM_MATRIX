import { type NextAuthOptions } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "@/server/db";
import CredentialsProvider from "next-auth/providers/credentials";
import { userSignInValidator } from "./validations/user-signin.validator";
import { type Adapter } from "next-auth/adapters";
import { users } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";
import { selectUserDetailSchema } from "@/server/models/user.model";

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "auth/login",
  },
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        try {
          const { email, password } = userSignInValidator.parse(credentials);

          const usersData = await db
            .select({ id: users.id })
            .from(users)
            .where(eq(users.email, email));

          if (!usersData[0]) {
            return null;
          }
          const userId = usersData[0].id;

          const userInfo = await db
            .select()
            .from(users)
            .where(eq(users.id, userId));

          if (userInfo[0]) {
            const passwordMatch = await bcrypt.compare(
              password,
              userInfo[0].password,
            );

            if (!passwordMatch) {
              return null;
            } else {
              const user = selectUserDetailSchema.parse(userInfo[0]);
              return user;
            }
          } else {
            return null;
          }
        } catch (error) {
          if (error instanceof z.ZodError) {
            console.error("Invalid request payload");
            return null;
          }
          console.error("An error occured");
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (token.sub) {
        const dbUserResult = await db
          .select()
          .from(users)
          .where(eq(users.id, token.sub));
        if (!dbUserResult[0]) {
          if (user) {
            token.id = user.id;
          }

          return token;
        }
        const dbUser = dbUserResult[0];

        return {
          id: dbUser.id,
          name: dbUser.name,
          email: dbUser.email,
          picture: dbUser.image,
          role: dbUser.role,
        };
      } else {
        return token;
      }
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.image = token.picture;
        session.user.role = token.role;
      }

      return session;
    },
  },
};
