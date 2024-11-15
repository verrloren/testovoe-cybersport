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

interface HistoryTableProps {
	interviewees: IntervieweeType[],
	taroResult: ResultType[]
}

export function HistoryTable({ interviewees, taroResult }: HistoryTableProps) {
	return (
		<div>
      <h1 className="font-libreFranklin font-bold text-5xl text-white pt-12 pb-4">
        History
      </h1>

      <Table className="card-background rounded-2xl text-white">
        <TableHeader>
          <TableRow>
            <TableHead>Interviewee</TableHead>
            <TableHead>Team</TableHead>
            <TableHead>Tarot</TableHead>
            <TableHead>Astro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>

          {interviewees.map((interviewee) => (
            <TableRow key={interviewee.id}>
              <TableCell>{interviewee.name}</TableCell>
              <TableCell>{interviewee.teamId}</TableCell>
              {/* {taroResult.map((result) => {
                if (result.intervieweeId === interviewee.id) {
                  return (
                    <TableCell key={result.id}>{result.cardId}</TableCell>
                  );
                }
                return null;
              })} */}
            </TableRow>
          ))}

        </TableBody>
      </Table>
		</div>
	)
}
