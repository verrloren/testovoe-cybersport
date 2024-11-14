import { auth } from "../../../../auth";
import RegisterForm from "@/components/authUI/register-form";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {
  const session = await auth();
  const userId = session?.user?.id;

  if (userId) {
    redirect("/");
  }

  return (
    <main className="w-full h-screen relative flex flex-col justify-center items-center">


      <Suspense>
        <RegisterForm />
      </Suspense>


    </main>
  );
}
