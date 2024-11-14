import NextAuth from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import { db } from '@/lib/db';
import { UserRole } from '@prisma/client';
import { getUserById } from '@/utils/getUserBy';
import authConfig from './auth.config';

export const { 
    handlers: { GET, POST }, 
    auth,
    signIn,
    signOut
} = NextAuth({
    pages: {
        // Redirect to this URL if something goes wrong
        signOut: "/auth/login",
        signIn: "/auth/login",
        error: "/auth/error",
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: { emailVerified: new Date() }
            });
        }
    },
    callbacks: {
        // Passing token from JWT to session and adding new field with value of token id
        async session({ token, session }) {
            // Add id to session.user
            if (token.sub && session.user) {
                session.user.id = token.sub;
            }

            // Add role to session.user
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-expect-error
            if (token.role && session.user.role) {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-expect-error
                session.user.role = token.role as UserRole;
            }

            return session;
        },
        async jwt({ token }) {
            // Pass role to token because we can get access from the token
            // inside middleware in the request
            // hence we can create logic in the middleware
            // to check whether user is admin or not

            // Find user by id and add role to token
            if (!token.sub) return token;

            const existingUser = await getUserById(token.sub);

            if (!existingUser) return token;

            token.role = existingUser.role;

            return token;
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    ...authConfig,
});