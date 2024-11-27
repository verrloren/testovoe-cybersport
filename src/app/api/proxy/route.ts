// import { NextResponse } from "next/server";

// export async function POST(req: Request) {

//   try {
//     const body = await req.json();
// 		console.log("Request body:", body);
//     const response = await fetch(`${process.env.BACKEND_API_URL}/api/users/login`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "API-Key": process.env.BACKEND_API_KEY as string,
//       },
//       body: JSON.stringify(body),
//     });

//     const setCookieHeader = response.headers.get("set-cookie");

//     // Прокидываем Set-Cookie в клиентский ответ
//     const res = NextResponse.json(await response.json(), {
//       status: response.status,
//     });

//     if (setCookieHeader) {
//       res.headers.append("set-cookie", setCookieHeader);
//     }

//     return res;
//   } catch (error) {
//     console.error("Proxy error:", error);
//     return NextResponse.json(
//       { success: false, message: "Internal Server Error" },
//       { status: 500 }
//     );
//   }
// }
