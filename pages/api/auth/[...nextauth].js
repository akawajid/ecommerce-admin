import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import clientPromise from "@/lib/mongodb";
import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import md5 from "md5";

const adminEmails = ["b68bc3348322406648368fc49a4d8bd2"];

export const authOptions = {
  debug: true,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  adapter: MongoDBAdapter(clientPromise),
  callbacks: {
    session: async ({ session, user }) => {
      if (!adminEmails.includes(md5(user?.email))) {
        return false;
      }
      session.user.isAdmin = true;
      return session;
    },
  },
};

export default NextAuth(authOptions);
