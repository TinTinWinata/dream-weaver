import Button from "../components/button";
import Input from "../components/input";
import Paper from "../components/paper";
import TextArea from "../components/text-area";

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-3">
        <Paper className="w-[30%] flex-col items-center p-8 justify-center">
            <div className="center">
              <img src="/assets/profile.png" className="w-32" alt="Profile" />
            </div>
            <h2 className="font-bold text-3xl">TinTin Winata</h2>
            <p className="text-left">
              Member since 2024
            </p>
        </Paper>
        <Paper className="w-[70%] p-5 flex flex-col gap-5">
          <Input placeholder="tintinwinata" title="Username"/>
          <Input placeholder="tintin6892@gmail.com" title="Email"/>
          <Button className="w-fit px-10">Save Profile</Button>
        </Paper>
      </div>
      <Paper className="p-5 flex flex-col gap-3">
        <Input title="Url" placeholder="dream.co/tintinwinata"/>
        <TextArea title="Message" placeholder="" className="min-h-32"/>
        <Input title="Youtube" placeholder="https://youtube.com/"/>
        <Input title="TikTok" placeholder="https://tiktok.com/"/>
        <Button className="px-10">Save</Button>
      </Paper>
    </div>
  )
}
