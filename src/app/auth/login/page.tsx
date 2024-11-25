import LoginForm from "@/components/authUI/login-form";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <main className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden">
      


			<div
        className="noise w-full xl:w-[100vh] aspect-square -z-10 absolute 
				top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
				radial-ellipse 
				bg-gradient-to-r overflow-hidden"
      ></div>

      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
