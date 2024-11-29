'use server';

import { cookies } from "next/headers";
import { redirect } from 'next/navigation';

type DataType = {
    success: boolean;
    response: string;
    statusCode?: number;
}

export const validateToken = async (): Promise<DataType> => {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('access_token')?.value;

        if (!token) {
            redirect('/auth/login');
        }

        const result = await fetch(`${process.env.BACKEND_API_URL}/api/users`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'API-Key': process.env.BACKEND_API_KEY as string,
                'Authorization': `Bearer ${token}`,
                'Accept': 'application/json',
            },
        });

        if (result.status === 401) {
            console.error('Unauthorized access');
            redirect('/auth/login');
        }

        if (!result.ok) {
            console.error('API Error:', {
                status: result.status,
                statusText: result.statusText
            });
            return {
                success: false,
                response: `Server Error`,
                statusCode: result.status
            };
        }

        const data = await result.json();
        return {
            success: true,
            response: data.response,
            statusCode: result.status
        };
    } catch (error) {
        console.error('Token Validation Error:', error);
        return {
            success: false,
            response: "Authentication failed",
            statusCode: 500
        };
    }
};