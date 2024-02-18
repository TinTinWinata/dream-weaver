import { FormEvent } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Paper from "../components/paper";
import useUser from "../contexts/user-context";

export default function RegisterPage() {

  const {auth} = useUser();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    auth();
  }

  return (
    <div className="center">
    <Paper className="p-7 w-full max-w-[700px] ">
      <h2 className="font-bold text-3xl text-center">Register Account</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <Input title="Email" placeholder="tintin6892@gmail.com"/>
        <Input title="Name" placeholder="tintinwinata"/>
        <Button className="py-2.5 mt-2">Create Account</Button>
      </form>
    </Paper>
    </div>
  )
}
