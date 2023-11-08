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
import { useSelector } from "react-redux";
import { useUpdateUser } from "../lib/Rquery/RTQApi";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "@/components/ui/use-toast";

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  username: z.string().min(2, {
    message: "username must be at least 2 characters.",
  }),
  email: z.string().min(2, {
    message: "email must be at least 2 characters.",
  }),
  bio: z.string().min(2, {
    message: "bio must be at least 2 characters.",
  }),
});

function EditProfile() {
  const user = useSelector((state) => state.user.user);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      imageUrl: [],
      name: user.name,
      username: user.username,
      email: user.email,
      bio: user.bio,
    },
  });
  const { toast } = useToast();
  const navigate = useNavigate();

  const { mutateAsync: editProfile, isPending: isEditing } = useUpdateUser();
  const { userId } = useParams();
  async function onSubmit(values) {
    try {
      const file = document.getElementById("profileImage").files[0];
      const updatedUser = await editProfile({ ...values, file, userId });

      if (!updatedUser) {
        toast({ title: "Something went wrong. Please try again" });
      }

      navigate("/profile/" + userId);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="text-white p-10 w-full">
      <h2 className="flex mb-5 gap-5 items-center text-2xl font-bold">
        <img src="/assets/icons/edit.svg" alt="Edit Profile" />
        Edit Profile
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 text-white"
        >
          <FormField
            control={form.control}
            name="imageUrl"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Profile Image</FormLabel>
                <FormControl>
                  <Input
                    id="profileImage"
                    className="text-white bg-gray border-none focus:!border-cOne focus:!outline-cOne focus:!ring-offset-0"
                    type="file"
                    name="imageUrl"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
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
              <FormItem>
                <FormLabel>UserName</FormLabel>
                <FormControl>
                  <Input
                    disabled
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
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    type="email"
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
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
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
          <Button className="bg-cOne w-full" type="submit">
            {isEditing ? (
              <svg
                className="animate-spin h-5 w-5 rounded-full border border-t-gray border-white"
                viewBox="0 0 24 24"
              ></svg>
            ) : (
              "Edit"
            )}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default EditProfile;
