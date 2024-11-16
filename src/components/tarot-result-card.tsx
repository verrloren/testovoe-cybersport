"use client";

import { IntervieweeType, ResultType, TarotCardType } from "@/lib/types";
import Image from "next/image";
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

      <div className="w-[80%] lg:w-[60%] h-auto mt-20 rounded-3xl bg-white border border-neutral-300 ">
        <div className="w-full h-full relative flex flex-row items-start">
          <div className="w-1/2 flex h-full flex-row justify-center items-start">
            <Image
              src={cardTarot.url}
              alt={cardTarot.name}
              width={500}
              height={300}
              className="rounded-tl-3xl rounded-bl-3xl border-r border-neutral-300"
            />
          </div>

					{/* tabs section and bottom div */}
          <div className="w-full h-full relative flex flex-col items-start">

						{/* tabs and pane */}
            <div className="w-full h-2/3 flex flex-row items-start">

							{/* tabs */}
              <div className="w-full h-full flex flex-col items-start">
								<Tabs defaultValue="compatibility" className="w-5/6 pt-24 pl-8">
								  <TabsList className="pb-8">
								    <TabsTrigger className="text-[#666] text-xl data-[state=active]:text-black data-[state=active]:shadow-none
										 data-[state=active]:text-2xl "  
										value="compatibility"> 
											Совместимость 
										</TabsTrigger> 
								    <TabsTrigger className="text-[#666] text-xl data-[state=active]:text-black data-[state=active]:shadow-none
										 data-[state=active]:text-2xl "  
										value="meaning"> 
											Значение 
										</TabsTrigger> 
								    <TabsTrigger className="text-[#666] text-xl data-[state=active]:text-black data-[state=active]:shadow-none
										 data-[state=active]:text-2xl "  
										value="stregth"> 
											Сила 
										</TabsTrigger> 
								    <TabsTrigger className="text-[#666] text-xl data-[state=active]:text-black data-[state=active]:shadow-none
										 data-[state=active]:text-2xl " 
										value="weakness">
											Слабость
										</TabsTrigger>
								  </TabsList>
								  <TabsContent 
									className="text-[#666]  text-base [text-indent:1.5rem]" 
									value="compatibility">
										{result.compatibilityTaroDescription}
									</TabsContent>
								  <TabsContent 
									className="text-[#666]  text-base [text-indent:1.5rem]" 
									value="meaning">
										{cardTarot.meaning}
									</TabsContent>
								  <TabsContent 
									className="text-[#666]  text-base [text-indent:1.5rem]" 
									value="stregth">
										{cardTarot.strength}
									</TabsContent>
								  <TabsContent 
									className="text-[#666]  text-base [text-indent:1.5rem]" 
									value="weakness">
										{cardTarot.weakness}
									</TabsContent>
								</Tabs>
              </div>

							
              <div className="w-1/5 min-h-[29rem] py-10 flex items-center flex-col justify-between rounded-tr-3xl bg-[#F46645]">
                <h3 className=" text-5xl text-white writing-mode-vertical-rl">
                  {toRomanNumeral(cardTarot.id)}
                </h3>
                <h3 className="text-white text-5xl  writing-mode-vertical-rl ">
                  {cardTarot.name}
                </h3>
              </div>

            </div>

            <div className="w-full h-full py-8 px-12 flex flex-row items-center justify-between  bg-[#297878] rounded-br-3xl">
              <h1 className="text-white font-bold text-5xl ">
                {interviewee.name}
              </h1>

              <h1 className="text-white font-bold text-7xl">
                {result.compatibilityTaroPercent}%
              </h1>
            </div>

          </div>

        </div>
      </div>
    </>
  );
}
