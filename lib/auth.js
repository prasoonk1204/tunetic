import GoogleProvider from "next-auth/providers/google";
import TwitterProvider from "next-auth/providers/twitter";
import { connectToDB } from "@/lib/connectToDB";
import User from "@/models/User";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID,
      clientSecret: process.env.TWITTER_CLIENT_SECRET,
      version: "2.0",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async signIn({ user, account, profile }) {
      await connectToDB();

      const provider = account.provider;
      const providerAccountId = account.providerAccountId;

      const generatedEmail =
        user.email || `${provider}-${providerAccountId}@tunetic.com`;

      const existingUser = await User.findOne({
        $or: [{ email: generatedEmail }, { provider, providerAccountId }],
      });

      if (!existingUser) {
        const username =
          profile?.data?.username ||
          profile?.login ||
          generatedEmail.split("@")[0] ||
          "user";

        await User.create({
          name: user.name || profile?.name || "Unknown",
          email: generatedEmail,
          image:
            user.image ||
            profile?.picture ||
            profile?.data?.profile_image_url ||
            "",
          username,
          provider,
          providerAccountId,
        });
      }

      return true;
    },

    async jwt({ token, account, profile }) {
      if (account && profile) {
        token.provider = account.provider;
        token.username =
          profile?.data?.username ||
          profile?.login ||
          token.email?.split("@")[0] ||
          "unknown";
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.sub;
      session.user.provider = token.provider;
      session.user.username = token.username;
      return session;
    },
  },
};
