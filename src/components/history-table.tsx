"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Container from "./container";

interface HistoryTableProps {
  teamName: {
    id: string;
    name: string;
  };
  interviewee: {
    id: string;
    teamId: string;
    results: {
      compatibilityTaroPercent: string;
      compatibilityAstroPercent: string;
    };
  }[];
}

export function HistoryTable({ teamName, interviewee }: HistoryTableProps) {

  return (
    <Container>
      <div>
        <Table className="bg-white border mt-16 border-neutral-300 rounded-2xl text-black">
          <TableHeader>
            <TableRow>
              <TableHead className="text-white font-semibold bg-[#297878]">
                Собеседуемый
              </TableHead>
              <TableHead className="text-white font-semibold bg-[#297878]">
                Команда
              </TableHead>
              <TableHead className="text-white font-semibold bg-[#297878]">
                Таро
              </TableHead>
              <TableHead className="text-white font-semibold bg-[#297878]">
                Астро
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {interviewee.map((person) => {
							//@ts-ignore
              const team = teamName.find((t) => t.id === person.teamId);
							//@ts-ignore
              const latestResult = person.results[0]; // Get the first result if exists

              return (
                <TableRow key={person.id}>
									{/* @ts-ignore */}
                  <TableCell className="font-medium">{person.name}</TableCell>
                  <TableCell>{team?.name || "N/A"}</TableCell>
                  <TableCell>
                    {latestResult?.compatibilityTaroPercent
                      ? `${latestResult.compatibilityTaroPercent}%`
                      : "-"}
                  </TableCell>
                  <TableCell>
                    {latestResult?.compatibilityAstroPercent
                      ? `${Math.floor(Number(latestResult.compatibilityAstroPercent) * 100)}%`
                      : "-"}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </Container>
  );
}
