import { Principal } from "@dfinity/principal";

export type TPost = {
  id: string
  title: string;
  description: string;
  currentAmount: number;
  target: number;
  imageUrl: string;
  startDate: number;
  endDate: number;
  username : string
  userProfile : string
}

