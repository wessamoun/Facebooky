import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useParams } from "react-router-dom";
import {
  useGetLikedPosts,
  useGetUserById,
  useGetUserPosts,
} from "../lib/Rquery/RTQApi";
import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { useSelector } from "react-redux";

function Profile() {
  const Account = useSelector((state) => state.user.user);
  let { userId } = useParams();
  console.log(userId);
  const { data: user, isLoading: isUserLoading } = useGetUserById(userId);
  const { data: userPosts, isLoading: isUserPostsLoading } = useGetUserPosts(userId);
  const likedPostsArray = user?.liked.map((liked) => liked.$id);
  const { data: likedPosts, isLoading: isLikedPostsLoading } =
    useGetLikedPosts(likedPostsArray);
  // console.log(user?.liked);
  console.log(isLikedPostsLoading ? "Loading..." : likedPosts);
  return (
    <>
      {isUserLoading ? (
        <Loading />
      ) : (
        <div className="p-16 w-full h-screen overflow-scroll">
          <div className="header flex gap-6">
            <div className="image">
              <img
                className="w-32 rounded-full"
                src={user.imageUrl}
                alt={user.imageId}
              />
            </div>
            <div className="info text-white flex flex-col flex-1 gap-2">
              <div className="name text-3xl">{user.name}</div>
              <div className="username text-cOne text-sm">
                {"@" + user.username}
              </div>
              <div className="bio">{user.bio || "Eng"}</div>
              <div className="nPosts">
                <span className="text-cOne mr-3">{user.posts.length}</span>Posts
              </div>
            </div>
            <div className="edit">
              {Account.$id === userId && <Button>
                <img
                  src="../../public/assets/icons/edit.svg"
                  alt="image"
                  className="w-6 mr-3"
                />
                Edit Profile
              </Button>}
            </div>
          </div>
          <Tabs defaultValue="Posts" className="w-full mt-16 text-white">
            <TabsList className="bg-bg ">
              <TabsTrigger value="Posts" className="text-xl w-56">
                <img
                  src="../../public/assets/icons/wallpaper.svg"
                  alt="image"
                  className="w-6 mr-3"
                />
                Posts
              </TabsTrigger>
              <TabsTrigger value="Likes" className="text-xl w-56">
                <img
                  src="../../public/assets/icons/like.svg"
                  alt="image"
                  className="w-6 mr-3"
                />{" "}
                Liked Posts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Posts" className="text-white">
              <div className="flex flex-col gap-5 mt-9">
                {userPosts === undefined ? (
                  "No Posts Created"
                ) : isUserPostsLoading ? (
                  <Loading />
                ) : (
                  userPosts.documents.map((post) => (
                    <PostCard post={post} key={post.$id} />
                  ))
                )}
              </div>
            </TabsContent>
            <TabsContent value="Likes" className="text-white">
              <div className="flex flex-col gap-5 mt-9">
                {likedPosts === undefined ? (
                  "No Posts Created"
                ) : isLikedPostsLoading ? (
                  <Loading />
                ) : (
                  likedPosts.documents.map((post) => (
                    <PostCard post={post} key={post.$id} />
                  ))
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </>
  );
}

export default Profile;
