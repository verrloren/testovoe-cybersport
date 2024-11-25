import LoginForm from "@/components/authUI/login-form";
import { Suspense } from "react";

export default async function LoginPage() {
  return (
    <main className="w-full h-screen relative flex flex-col justify-center items-center">
      
			<div
        className="noise w-full aspect-square -z-10 absolute 
				-top-[50%] sm:-top-[80%] md:-top-[100%] lg:-top-[120%] xl:-top-[170%] left-0
				radial-ellipse 
				bg-gradient-to-r overflow-hidden"
      ></div>

      <Suspense>
        <LoginForm />
      </Suspense>
    </main>
  );
}
