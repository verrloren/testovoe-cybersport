import { Container } from "@/shared";
import { StyleguideCreateForm } from "@/features/styleguides";

export default async function NewStyleGuidePage() {
  return (
    <Container>
			{/* dark */}
      <div
        className="radial-ellipse-dashboard-black w-full aspect-square
        fixed right-0 -top-[20%] sm:-top-1/4 md:-top-1/4 lg:-top-[40%]
        xl:-top-[60%] "
      />
      <main
        className="w-full min-h-screen relative flex flex-col justify-center items-center md:flex-row gap-y-8
 				xl:gap-x-12 2xl:gap-x-20 md:gap-x-8 overflow-x-hidden mt-12 sm:mt-24 lg:mt-32"
      >
        <div className="w-full md:w-3/4 xl:w-[60%] mt-24 md:mt-16 pb-16">
          <StyleguideCreateForm />
        </div>
      </main>
    </Container>
  );
}
