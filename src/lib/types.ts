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
  meaning?: string;
  strength?: string;
  weakness?: string;
}

export interface MemberType {
  id: string;
  name: string;
  taroCard: TarotCardType;
  dateOfBirth: Date;
}