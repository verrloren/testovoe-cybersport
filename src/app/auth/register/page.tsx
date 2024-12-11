import { AuthSphere } from "@/modules/auth/components/auth-sphere";
import RegisterForm from "@/modules/auth/components/register-form";
import { Suspense } from "react";

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
