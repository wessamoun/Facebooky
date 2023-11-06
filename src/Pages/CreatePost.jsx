import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import FileUploader from "../components/FileUploader";
import { useSelector } from "react-redux";
import { useCreatePost } from "../lib/Rquery/RTQApi";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";


function CreatePost() {
  const { toast } = useToast();
  const navigate = useNavigate()

  const user = useSelector((state) => state.user.user);
  const form = useForm({
    defaultValues: {
      caption: "",
      image: [],
      location: "",
      tags: "",
    },
  });

  const { mutateAsync: createNewPost, isPending: isCreating } = useCreatePost();

  async function onSubmit(values) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    try {
      console.log(values);

      const newPost = await createNewPost({
        ...values,
        userId: user.$id,
      });

      if (!newPost) {
        toast({ title: "Something went wrong. Please try again" });
      }

      navigate("/");
      console.log(newPost);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="flex flex-col flex-1 h-screen text-white pt-12 px-8 gap-6 overflow-scroll">
      <div className=" text-2xl font-bold">Create Post</div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <FormField
            control={form.control}
            name="caption"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white mb-4">Caption</FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray border-none focus:!border-cOne focus:!outline-cOne focus:!ring-offset-0"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white mb-4">Add Photo</FormLabel>
                <FormControl>
                  <FileUploader fieldChange={field.onChange} />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white mb-4">Add Location</FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray border-none focus:!border-cOne focus:!outline-cOne focus:!ring-offset-0"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="tags"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-white mb-4">{`Add Tags (separated by comma " , ")`}</FormLabel>
                <FormControl>
                  <Input
                    className="text-white bg-gray border-none focus:!border-cOne focus:!outline-cOne focus:!ring-offset-0"
                    type="text"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <Button className="bg-cOne mx-auto mt-10 w-full" type="submit">
            {isCreating ? "Loading..." : "Create"}
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreatePost;
