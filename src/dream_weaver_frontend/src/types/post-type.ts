import { Principal } from "@dfinity/principal";

export type TPost = {
  title: string;
  description: string;
  currentAmount: number;
  target: number;
  imageUrl: string;
  startDate: number;
  endDate: number;
  userId: Principal;
}

