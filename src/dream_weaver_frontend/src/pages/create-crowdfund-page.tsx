import { useState } from "react";
import Button from "../components/button";
import Input from "../components/input";
import Paper from "../components/paper";
import TextArea from "../components/text-area";
import Upload from "../components/upload";
import useLoading from "../contexts/loading-context";
import { SubmitHandler, useForm } from "react-hook-form";
import { TCreatePostPayload } from "../types/create-post-payload";
import { UploadFile } from "../utils/uploader";
//@ts-ignore
import { dream_weaver_backend } from "declarations/dream_weaver_backend";
import useUser from "../contexts/user-context";
import { toastError, toastSuccess } from "../utils/toast";
import { useNavigate } from "react-router-dom";

export default function CreateCrowdfundPage() {
  const [selectedFile, setSelectedFile] = useState<File>();
  const { setLoading } = useLoading();
  const { user } = useUser();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TCreatePostPayload>();

  const onSubmit: SubmitHandler<TCreatePostPayload> = async ({
    title,
    description,
    end_date,
    target_amount,
  }) => {
    if (selectedFile) {
      setLoading(true);
      const url = await UploadFile("posts/", selectedFile);
      const createPostResponse = await dream_weaver_backend.createPost(
        title,
        description,
        target_amount,
        url,
        Date.now(),
        end_date.getTime(),
        user?.principal
      );
      setLoading(false);
      if (
        "Err" in createPostResponse &&
        "UserNotFound" in createPostResponse.Err
      ) {
        toastError("User not found. Please make sure you are logged in");
      } else {
        toastSuccess("Successfully created posts");
        navigate("/crowdfund");
      }
    }
  };

  return (
    <Paper className="p-5">
      <form encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-center text-2xl mb-4 font-bold">
          Create Crowdfund
        </h1>
        <div className="flex flex-col gap-5">
          <Input
            title="Title"
            placeholder="Buy korma"
            props={{
              ...register("title", {
                required: "Title is required to create a post",
                minLength: {
                  value: 5,
                  message: "Title cannot be less than 5 character",
                },
              }),
            }}
            errors={errors}
          />
          <TextArea
            props={{
              style: { minHeight: "200px" },
              ...register("description", {
                required: "Description is required to create a post",
                minLength: {
                  value: 5,
                  message: "Description must be longer than 5 character",
                },
                maxLength: {
                  value: 100,
                  message: "Description must be les than 100 character",
                },
              }),
            }}
            title="Description"
            placeholder="Tell me something about this ..."
            errors={errors}
          />
          <Input
            props={{
              type: "number",
              ...register("target_amount", {
                valueAsNumber: true,
              }),
            }}
            title="ICP Amount"
            placeholder="10 ICP"
            errors={errors}
          />
          <Input
            props={{
              type: "date",
              ...register("end_date", { valueAsDate: true }),
            }}
            title="End Date"
            errors={errors}
          />
          <Upload
            accept={["jpg", "png", "jpeg"]}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
            title="Drag file Image here or browse"
          />
          <Button>Submit</Button>
        </div>
      </form>
    </Paper>
  );
}
