import { AuthSphere } from "@/modules/auth/components/auth-sphere";
import RegisterForm from "@/modules/auth/components/register-form";
import { Suspense } from "react";

export default async function LoginPage() {

  return (
    <main className="w-full h-screen relative flex flex-col justify-center items-center overflow-hidden">


			<AuthSphere />

			{/* <div className="w-full xl:w-[100vh] aspect-square rounded-full 
			absolute top-1/2 left-1/2  z-0
			radial-ellipse noise"></div> */}
			{/* <div
        className="noise w-full xl:w-[100vh] aspect-square -z-10 absolute 
		top-1/2 left-1/2 transform-translate-x-1/2 -translate-y-1/2
		radial-ellipse  overflow-hidden"
      ></div> */}

      <Suspense>
        <RegisterForm />
      </Suspense>


    </main>
  );
}
