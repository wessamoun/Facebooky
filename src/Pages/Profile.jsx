import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, useParams } from "react-router-dom";
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

  const { userId } = useParams();

  const {
    data: user,
    isPending: isUserLoading,
    isRefetching: reF,
  } = useGetUserById(userId || "");
  const { data: userPosts, isPending: isUserPostsLoading } =
    useGetUserPosts(userId);
  const likedPostsArray = user?.liked.map((liked) => liked.$id);
  const { data: likedPosts, isPending: isLikedPostsLoading } =
    useGetLikedPosts(likedPostsArray);

  return (
    <>
      {reF ? (
        <Loading />
      ) : isUserLoading ? (
        <Loading />
      ) : (
        <div className="p-8 md:p-16 w-full h-screen overflow-scroll mt-12 md:mt-0 mb-20 md:mb-0">
          <div className="header flex flex-col md:flex-row justify-center items-center text-center gap-6">
            <div className="image">
              <img
                className="w-32 rounded-full"
                src={user.imageUrl}
                alt={user.imageId}
              />
            </div>
            <div className="info text-white flex flex-col flex-1 gap-2">
              <div className="name text-4xl font-bold">{user.name}</div>
              <div className="username text-cOne text-sm">
                {"@" + user.username}
              </div>
              <div className="bio">{user.bio || "Eng"}</div>
              <div className="nPosts">
                <span className="text-cOne mr-3">{user.posts.length}</span>Posts
              </div>
            </div>
            <Link to={"/editProfile/" + userId} className="edit">
              {Account.$id === userId && (
                <Button>
                  <img
                    src="/assets/icons/edit.svg"
                    alt="image"
                    className="w-6 mr-3"
                  />
                  Edit Profile
                </Button>
              )}
            </Link>
          </div>
          <Tabs defaultValue="Posts" className="w-full mt-16 text-white">
            <TabsList className="bg-bg flex justify-center">
              <TabsTrigger value="Posts" className="text-lg w-full md:w-56">
                <img
                  src="/assets/icons/wallpaper.svg"
                  alt="image"
                  className="w-6 mr-3"
                />
                Posts
              </TabsTrigger>
              <TabsTrigger value="Likes" className="text-lg w-full md:w-56">
                <img
                  src="/assets/icons/like.svg"
                  alt="image"
                  className="w-6 mr-3"
                />{" "}
                Liked Posts
              </TabsTrigger>
            </TabsList>
            <TabsContent value="Posts" className="text-white">
              <div className="flex flex-col gap-5 mt-9">
                {userPosts === undefined ||
                  userPosts.documents.length === 0 ? (
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
                {isLikedPostsLoading ? (
                  <Loading />
                ) : likedPosts === undefined ||
                  likedPosts.documents.length === 0 ? (
                  "No Posts Liked"
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
