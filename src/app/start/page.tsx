import { getUser } from "@/action/getUser";

export default async function StartPage() {

	const currentUser = await getUser();
	console.log(currentUser)

  return (
    <main className="w-full h-screen relative flex flex-col items-center ">
      <div
        className="noise w-1/2 aspect-square -z-10 absolute top-1/2 left-1/2
				radial-ellipse 
				bg-gradient-to-r overflow-hidden"
      ></div>
    </main>
  );
}
