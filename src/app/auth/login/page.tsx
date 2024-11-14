import { auth } from "../../../../auth";
import LoginForm from "@/components/authUI/login-form";
import { redirect } from "next/navigation";
import { Suspense } from "react";

export default async function LoginPage() {

	const session = await auth();
	const userId = session?.user?.id;

	if (userId) {
		redirect('/')
	}

	return (
		<main className="w-full h-screen relative flex flex-col justify-center items-center">

		<Suspense>
			<LoginForm />
		</Suspense>



	</main>
	)
}
