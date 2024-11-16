'use client'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IntervieweeType, ResultType } from "@/lib/types";
import Container from "./container";

interface HistoryTableProps {
	interviewees: IntervieweeType[],
	taroResult: ResultType,
	teamsName: string
}

export function HistoryTable({ interviewees, taroResult, teamsName }: HistoryTableProps) {
	return (
		<Container>
			<div>
			
						<Table className="bg-white border mt-16 border-neutral-300 rounded-2xl text-black">
							<TableHeader>
								<TableRow>
									<TableHead className="text-white font-semibold bg-[#297878]">Собеседуемый</TableHead>
									<TableHead className="text-white font-semibold bg-[#297878]">Команда</TableHead>
									<TableHead className="text-white font-semibold bg-[#297878]">Таро</TableHead>
									<TableHead className="text-white font-semibold bg-[#297878]">Астро</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
			
							{interviewees.map((interviewee) => (
              <TableRow key={interviewee.id}>
                <TableCell className="bg-white">{interviewee.name}</TableCell>
                <TableCell className="bg-white">{teamsName}</TableCell>
                <TableCell className="bg-white">
                  {taroResult && taroResult.intervieweeId === interviewee.id ? 
                    `${taroResult.compatibilityTaroPercent}%` : 
                    '-'
                  }
                </TableCell>
								<TableCell className="bg-white">
							  {taroResult?.[interviewee.id]?.compatibilityTaroPercent 
							    ? `${taroResult[interviewee.id].compatibilityTaroPercent}%` 
							    : '-'
							  }
							</TableCell>
              </TableRow>
            ))}
			
							</TableBody>
						</Table>
			</div>
		</Container>
	)
}
