import Button from "../components/button";
import Input from "../components/input";
import Paper from "../components/paper";

export default function RegisterPage() {
  return (
    <div className="center">
    <Paper className="p-7 w-full max-w-[700px] ">
      <h2 className="font-bold text-3xl text-center">Register Account</h2>
      <form className="flex flex-col gap-4">
        <Input title="Email" placeholder="tintin6892@gmail.com"/>
        <Input title="Name" placeholder="tintinwinata"/>
        <Button className="py-2.5 mt-2">Create Account</Button>
      </form>
    </Paper>
    </div>
  )
}
