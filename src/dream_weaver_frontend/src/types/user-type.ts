import { Identity } from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export type TUser = {
  email: string;
  username: string;
  name: string;
  bio: string;
  youtubeUrl: string;
  tiktokUrl: string;
  createdAt: bigint;
  profilePicture: string ;
  posts: Array<string>;
  identity?: Identity;
  principal?: Principal;
}
