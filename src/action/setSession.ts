'use server';
import { cookies } from "next/headers";

export const setSession = async (token: string) => {
    const cookieStore = await cookies();
    cookieStore.set('access_token', token, { httpOnly: true, secure: true, maxAge: 60 * 60 * 24 * 7 }); // 1 week
}