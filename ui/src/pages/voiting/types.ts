export interface OptionsRequest {
  id?: string;
  idVote?: string;
  userId?: string;
  option: string; 
  description: string;
}

interface votesOptions {
  id: string;
  option: string;
  description: string;
  voteCount: number;
}

export interface CreateVote {
    userId: string,
    isOpen: boolean,
    startDate: string,
    endDate: string,
    title: string;
    votes: OptionsRequest[]
}

export interface CreatingVoting {
    title: string;
    startDate: Date;
    endDate: Date;
    options: OptionsRequest[]; 
  }

export interface Voting {
  endDate: string;
  id: string;
  isOpen: boolean;
  startDate: string;
  title: string;
  userId: string;
  usersIdVoted: string[];
  votes: votesOptions[];
}

export interface HandleCreateVoting {
    formattedStartDate: string;
    formattedEndDate: string;
    title: string;
    votes: OptionsRequest[];
  }
