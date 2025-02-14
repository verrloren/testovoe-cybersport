import { Suspense } from "react";
import { LoginForm, AuthSphere } from "@/features/auth";


export default async function LoginPage() {
  return (
    <main className="relative flex flex-col items-center 
		justify-center w-full h-screen overflow-hidden">
			<AuthSphere />
      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
