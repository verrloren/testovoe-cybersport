import { Suspense } from "react";
import LoginForm from "@/features/auth/ui/login-form";
import { AuthSphere } from "@/features/auth/ui/auth-sphere";

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
