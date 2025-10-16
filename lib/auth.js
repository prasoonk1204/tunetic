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

      if (existingUser) {
        const updatedFields = {};
        let hasChanges = false;

        const providerName = user.name || profile?.name || profile?.data?.name;
        const providerImage =
          user.image ||
          profile?.picture ||
          profile?.data?.profile_image_url ||
          profile?.profile_image_url;
        const providerUsername =
          profile?.data?.username ||
          profile?.login ||
          profile?.username ||
          profile?.screen_name;

        if (providerName && existingUser.name !== providerName) {
          updatedFields.name = providerName;
          hasChanges = true;
        }

        if (providerImage && existingUser.image !== providerImage) {
          updatedFields.image = providerImage;
          hasChanges = true;
        }

        if (providerUsername && existingUser.username !== providerUsername) {
          updatedFields.username = providerUsername;
          hasChanges = true;
        }

        if (
          user.email &&
          existingUser.email !== user.email &&
          !existingUser.email.includes("@tunetic.com")
        ) {
          updatedFields.email = user.email;
          hasChanges = true;
        }

        if (hasChanges) {
          await User.findByIdAndUpdate(existingUser._id, updatedFields, {
            new: true,
          });

          console.log(`Updated user ${existingUser._id}:`, updatedFields);
        }
      } else {
        const username =
          profile?.data?.username ||
          profile?.login ||
          profile?.username ||
          profile?.screen_name ||
          generatedEmail.split("@")[0] ||
          "user";

        await User.create({
          name: user.name || profile?.name || profile?.data?.name || "Unknown",
          email: generatedEmail,
          image:
            user.image ||
            profile?.picture ||
            profile?.data?.profile_image_url ||
            profile?.profile_image_url ||
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
          profile?.username ||
          profile?.screen_name ||
          token.email?.split("@")[0] ||
          "unknown";
      }
      return token;
    },

    async session({ session, token }) {
      await connectToDB();

      // Try to find user by email first, then by provider info from token
      let user = null;

      if (session.user.email) {
        user = await User.findOne({
          email: session.user.email,
        }).select("_id name email image username provider createdAt updatedAt");
      }

      // If no user found by email, try to find by provider and name (for Twitter)
      if (!user && token.provider) {
        user = await User.findOne({
          provider: token.provider,
          name: session.user.name,
        }).select("_id name email image username provider createdAt updatedAt");
      }

      if (user) {
        session.user.id = user._id.toString();
        session.user.name = user.name;
        session.user.email = user.email;
        session.user.image = user.image;
        session.user.username = user.username;
        session.user.provider = user.provider;
      }

      return session;
    },
  },
};
