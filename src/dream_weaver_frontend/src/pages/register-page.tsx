import { ErrorMessage } from "@hookform/error-message";
import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../components/button";
import Input from "../components/input";
import Paper from "../components/paper";
import useUser from "../contexts/user-context";
import { TRegisterPayload } from "../types/register-payload";

export default function RegisterPage() {
  const { auth } = useUser();

  const {register, handleSubmit, formState: { errors } } = useForm<TRegisterPayload>();

  const onSubmit: SubmitHandler<TRegisterPayload> = ({name, email }) => {
    console.log('Registering Name : ', name)
    console.log('Registering Email : ', email)
    auth(name, email)
  }

  return (
    <div className="center">
      <Paper className="p-7 w-full max-w-[700px] ">
        <h2 className="font-bold text-3xl text-center">Register Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            title="Email"
            placeholder="tintin6892@gmail.com"
            props={{ ...register('email', {required: true}) }}
          />
          <ErrorMessage
            errors={errors}
            name="email"
            render={({ message }) => <p className="text-white">{message}</p>}
          />
          <Input
            title="Name"
            placeholder="tintinwinata"
            props={{ ...register('name', {required: true}) }}
          />
          <ErrorMessage
            errors={errors}
            name="name"
            render={({ message }) => <p className="text-white">{message}</p>}
          />
          <Button className="py-2.5 mt-2">Create Account</Button>
        </form>
      </Paper>
    </div>
  );
}
