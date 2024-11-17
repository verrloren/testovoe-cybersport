export interface TeamType {
  id: string;
  name: string;
  userId: string;
  description?: string | null;
  members: MemberType[];
}

export interface ExtendedTeam extends TeamType {
  members: MemberType[];
}

export interface TarotCardType {
  id: string;
  name: string;
  url: string;
  meaning?: string | null;
  strength?: string | null;
  weakness?: string | null;
}

export interface MemberType {
  id: string;
  name: string;
  taroCard: TarotCardType;
  dateOfBirth: Date;
}

export interface IntervieweeType {
	id: string;
	name: string;
	dateOfBirth: Date;
	teamId: string;
	countryOfBirth?: string;
	cityOfBirth?: string;
}



export interface ResultType {
  id: string;
  date: Date;

  teamId: string;
  intervieweeId: string;
	cardId: string;
	
  compatibilityTaroPercent?: string | null;
  compatibilityTaroDescription?: string | null;

  compatibilityAstroPercent?: string | null;
  compatibilityAstroDescription?: string | null;
}