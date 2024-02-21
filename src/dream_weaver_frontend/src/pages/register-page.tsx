import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Button from "../components/button";
import Input from "../components/input";
import Paper from "../components/paper";
import useLoading from "../contexts/loading-context";
import useUser from "../contexts/user-context";
import { TRegisterPayload } from "../types/register-payload";
import { toastSuccess } from "../utils/toast";

export default function RegisterPage() {
  const { auth } = useUser();
  const { setLoading } = useLoading();

  const {register, handleSubmit, formState: { errors } } = useForm<TRegisterPayload>();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<TRegisterPayload> = ({name, email }) => {
    setLoading(true);
    auth(name, email, () => {
      setLoading(false) 
      toastSuccess('Register succesfully')
      navigate('/me')
    })
  }

  return (
    <div className="center">
      <Paper className="p-7 w-full max-w-[700px] ">
        <h2 className="font-bold text-3xl text-center">Register Account</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          <Input
            title="Email"
            placeholder="tintin6892@gmail.com"
            props={{ ...register('email', {required: 'Email must required to register', minLength: {value: 3, message: 'Email must more than 3 characters'}}) }}
            errors={errors}
          />
          <Input
            title="Name"
            placeholder="tintinwinata"
            props={{ ...register('name', {required: 'Name must required to register', minLength: {value: 3, message: 'Name must more than 3 characters'}}) }}
            errors={errors}
          />
          <Button className="py-2.5 mt-2">Create Account</Button>
        </form>
      </Paper>
    </div>
  );
}

