import Container from "@/components/container";
import { StyleguideCreateForm } from "@/modules/styleguides/ui/styleguide-create-form";

export default async function NewStyleGuidePage() {
  return (
    <Container>
      {/* sphere */}
      <div
        className="radial-ellipse-dashboard w-full aspect-square
			absolute left-0 -top-[20%] md:-top-1/3 lg:-bottom-1/3 -z-50
			  xl:top-[10%] "
      ></div>
      <main
        className="w-full min-h-screen relative flex flex-col justify-center items-center md:flex-row gap-y-8
 				xl:gap-x-12 2xl:gap-x-20 md:gap-x-8 overflow-x-hidden mt-12 sm:mt-24 lg:mt-32"
      >
        <div className="w-full xl:w-1/2 mt-20 pb-12">
          <StyleguideCreateForm />
        </div>
      </main>
    </Container>
  );
}
