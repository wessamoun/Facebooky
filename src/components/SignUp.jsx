import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useCreateAccount, useSignIn } from "../lib/Rquery/RTQApi";
import { Link, useNavigate } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";
import { useDispatch } from "react-redux";
import { getUser } from "../redux/userSlice";

const formSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z.coerce.string().email().min(5, {
    message: "Email must be a valid email address.",
  }),
  password: z.coerce.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function SignUp() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      name: "",
      email: "",
      password: "",
    },
  });

  const { mutateAsync: createAccount, isPending: isCreatingAccount } =
    useCreateAccount();
  const { mutateAsync: signIn } = useSignIn();

  // 2. Define a submit handler.
  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      const newUser = await createAccount(values);

      if (!newUser) {
        toast({ title: "Sign up failed. Please try again." });

        return;
      }

      const session = await signIn(values);

      if (!session) {
        toast({ title: "Something went wrong. Please login your new account" });

        navigate("/signin");

        return;
      } else {
        dispatch(getUser());
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col justify-center items-center">
      <h2 className="text-white bg-cOne font-bold text-3xl p-3 mb-4 rounded-lg">
        Facebooky
      </h2>
      <h3 className="text-white font-bold text-2xl lg:text-3xl p-3">
        Create a new account
      </h3>
      <p className=" text-cOne text-sm p-3 mb-2 ">
        To use snapgram, Please enter your details
      </p>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white mb-4">Name</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="text-white bg-gray border-none focus:!border-cOne focus:!outline-cOne focus:!ring-offset-0"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white mb-4">Username</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    className="text-white bg-gray border-none focus:!border-cOne focus:!outline-cOne focus:!ring-offset-0"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white mb-4">Email</FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray border-none focus:!border-cOne focus:!outline-cOne focus:!ring-offset-0"
                    type="email"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white mb-4">Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    className="text-white bg-gray border-none focus:!border-cOne focus:!outline-cOne focus:!ring-offset-0"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-cOne mx-auto w-full" type="submit">
            {isCreatingAccount ? "Loading..." : "Sign Up"}
          </Button>
        </form>
      </Form>
      <p className="text-white mt-4">
        Already have an account?
        <Link to="/signin" className="text-cOne pl-2">
          Log in
        </Link>
      </p>
    </div>
  );
}

export default SignUp;
