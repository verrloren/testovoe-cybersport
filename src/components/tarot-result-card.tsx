"use client";

import { IntervieweeType, ResultType, TarotCardType } from "@/lib/types";
import Image from "next/image";
import { SparklesCore } from "./ui/sparkles";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"


interface TarotResultCardProps {
  result: ResultType;
  cardTarot: TarotCardType;
  interviewee: IntervieweeType;
}

export function TarotResultCard({
  result,
  cardTarot,
  interviewee,
}: TarotResultCardProps) {

	// const intentString = (string: string | null | undefined, count: number, indent = " ") => {
	// 	return string.replace(/^/gm, indent.repeat(count));
	// }

	function toRomanNumeral(str: string): string {
		const num = str ? parseInt(str) : 0;
		const romanNumerals = [
			{ value: 22, numeral: 'XXII' },
			{ value: 21, numeral: 'XXI' },
			{ value: 20, numeral: 'XX' },
			{ value: 19, numeral: 'XIX' },
			{ value: 18, numeral: 'XVIII' },
			{ value: 17, numeral: 'XVII' },
			{ value: 16, numeral: 'XVI' },
			{ value: 15, numeral: 'XV' },
			{ value: 14, numeral: 'XIV' },
			{ value: 13, numeral: 'XIII' },
			{ value: 12, numeral: 'XII' },
			{ value: 11, numeral: 'XI' },
			{ value: 10, numeral: 'X' },
			{ value: 9, numeral: 'IX' },
			{ value: 8, numeral: 'VIII' },
			{ value: 7, numeral: 'VII' },
			{ value: 6, numeral: 'VI' },
			{ value: 5, numeral: 'V' },
			{ value: 4, numeral: 'IV' },
			{ value: 3, numeral: 'III' },
			{ value: 2, numeral: 'II' },
			{ value: 1, numeral: 'I' }
		];
	
		if (num < 1 || num > 22) {
			throw new Error('Number must be between 1 and 22');
		}
	
		let result = '';
		let remaining = num;
	
		for (const { value, numeral } of romanNumerals) {
			while (remaining >= value) {
				result += numeral;
				remaining -= value;
			}
		}
		return result;
	}

  return (
    <>
      <div className="w-full bg-gradient-to-b from-[#0a080d] to-black absolute inset-0 h-full -z-10">
        <SparklesCore
          id="tsparticlesfullpage"
          background="transparent"
          minSize={0.6}
          maxSize={1.4}
          particleDensity={15}
          className="w-full h-full"
          particleColor="#f5f5f5"
        />
      </div>
      <div className="w-[80%] lg:w-[60%] h-[35rem] mt-20 rounded-3xl card-background ">
        <div className="w-full h-full relative flex flex-row items-start">
          <div className="w-1/2 -translate-y-6 flex flex-row justify-center items-start">
            <Image
              src={cardTarot.url}
              alt={cardTarot.name}
              width={500}
              height={300}
              className="rounded-3xl"
            />
          </div>

          <div className="w-full h-full flex flex-col items-start">
            <div className="w-full h-full flex items-start">
              <div className="w-full h-full flex flex-col items-start">
                <div className="w-full border-b border-[#312F26]">
                  <Image
                    className="object-cover"
                    src="/images/lilias.svg"
                    alt="Lilias"
                    width={800}
                    height={100}
                  />
                </div>

                <div className="w-full h-full pl-10 pt-8">

								<Tabs defaultValue="compatibility" className="w-5/6">
								  <TabsList className="pb-8">
								    <TabsTrigger className="text-[#6A6A6A] text-xl data-[state=active]:text-white 
										font-lancelot data-[state=active]:text-2xl "  
										value="compatibility"> 
											Compatibility 
										</TabsTrigger> 
								    <TabsTrigger className="text-[#6A6A6A] text-xl data-[state=active]:text-white 
										font-lancelot data-[state=active]:text-2xl "  
										value="meaning"> 
											Meaning 
										</TabsTrigger> 
								    <TabsTrigger className="text-[#6A6A6A] text-xl data-[state=active]:text-white 
										font-lancelot data-[state=active]:text-2xl "  
										value="strengness"> 
											Strengness 
										</TabsTrigger> 
								    <TabsTrigger className="text-[#6A6A6A] text-xl data-[state=active]:text-white 
										font-lancelot data-[state=active]:text-2xl " 
										value="weakness">
											Weakness
										</TabsTrigger>
								  </TabsList>

								  <TabsContent 
									className="text-[#999] font-lancelot text-base [text-indent:1.5rem]" 
									value="compatibility">
										{result.compatibilityTaroDescription}
									</TabsContent>
								  <TabsContent 
									className="text-[#999] font-lancelot text-base [text-indent:1.5rem]" 
									value="meaning">
										{cardTarot.meaning}
									</TabsContent>
								  <TabsContent 
									className="text-[#999] font-lancelot text-base [text-indent:1.5rem]" 
									value="strengness">
										{cardTarot.strength}
									</TabsContent>
								  <TabsContent 
									className="text-[#999] font-lancelot text-base [text-indent:1.5rem]" 
									value="weakness">
										{cardTarot.weakness}
									</TabsContent>


								</Tabs>
                </div>
              </div>
              <div className="w-1/6 py-10 flex items-center flex-col justify-between h-full rounded-tr-3xl card-background-border-b-none">
                <h3 className="font-libreBaskerville text-5xl text-radial-gradient-dark writing-mode-vertical-rl">
                  {toRomanNumeral(cardTarot.id)}
                </h3>
                <h3 className="font-kings text-5xl text-radial-gradient-dark writing-mode-vertical-rl ">
                  {cardTarot.name}
                </h3>
              </div>
            </div>

            <div className="w-full px-12 flex flex-row items-center justify-between h-1/3 card-background-diff-direction  rounded-br-3xl">
              <h1 className="font-lancelot text-7xl text-radial-gradient-light">
                {interviewee.name}
              </h1>
              <h1 className="font-kings text-7xl text-radial-gradient-light">
                {result.compatibilityTaroPercent}%
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
