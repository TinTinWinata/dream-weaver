import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export type TUser = {
  walletPrincipal: string;
  email: string;
  name: string;
  username: string;
  bio: string;
  currentMoney: number;
  youtubeUrl: string;
  tiktokUrl: string;
  createdAt: bigint;
  profilePicture: string ;
  posts: Array<string>;
  identity?: Identity;
  principal?: Principal;
}
