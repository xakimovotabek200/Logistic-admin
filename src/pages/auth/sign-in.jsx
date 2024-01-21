import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Input,
  Typography,
} from "@material-tailwind/react";
import axios from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

const apiUrl = "auth/authenticate";

export function SignIn() {
  const [token, setToken] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    try {
      const response = await axios.post(apiUrl, formData, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.status >= 200 && response.status < 300) {
        const data = response.data;
        setToken(data.token);
        sessionStorage.setItem("token", data.token);
      } else {
        console.error(`Server returned an error: ${response.statusText}`);
      }
    } catch (error) {
      toast.error("Tizimga kira olmadingiz‼️", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  if (sessionStorage.getItem("token")) {
    return window.location.replace("/");
  }

  return (
    <>
      <img
        src="https://images.unsplash.com/photo-1497294815431-9365093b7331?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1950&q=80"
        className="absolute inset-0 z-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 z-0 h-full w-full bg-black/50" />
      <div className="container mx-auto p-4 ">
        <Card className="absolute left-2/4 top-2/4 w-full max-w-[24rem] -translate-x-2/4 -translate-y-2/4">
          <CardHeader
            variant="gradient"
            color="blue"
            className="mb-4 grid h-28 place-items-center"
          >
            <Typography variant="h3" color="white">
              Tizimga kirish
            </Typography>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <CardBody className="flex flex-col gap-4">
              <Input
                type="text"
                label="Foydalanuvchi nomi"
                size="md"
                aria-autocomplete="off"
                autoComplete="false"
                {...register("username", { required: true })}
              />
              {errors.username && (
                <Typography variant="caption" color="red">
                  Foydalanuvchi nomini kiriting
                </Typography>
              )}

              <Input
                type="password"
                label="Parol"
                autoComplete="off"
                size="md"
                {...register("password", { required: true })}
              />
              {errors.password && (
                <Typography variant="caption" color="red">
                  Parolni kiriting
                </Typography>
              )}

              <Button type="submit" variant="gradient" fullWidth>
                Kirish
              </Button>
            </CardBody>
          </form>
        </Card>
      </div>
    </>
  );
}

export default SignIn;
