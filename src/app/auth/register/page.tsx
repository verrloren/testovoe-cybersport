import { Suspense } from "react";
import { RegisterForm, AuthSphere } from "@/features/auth";

export default async function LoginPage() {

  return (
    <main className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden">
			<AuthSphere />
      <Suspense>
        <RegisterForm />
      </Suspense>
    </main>
  );
}
