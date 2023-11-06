import { useGetPosts } from "../lib/Rquery/RTQApi";
import Loading from "./Loading";
import PostCard from "./PostCard";

function Feed() {
  const {
    data: posts,
    isLoading: isPostLoading,
  } = useGetPosts();
  console.log(posts);
  return (
    <div className="flex flex-col flex-1 h-screen text-white pt-12 px-8 overflow-scroll gap-6 transition-all">
      <div className=" text-3xl font-bold flex flex-col ">Home Feed</div>
      {isPostLoading ? <Loading/> :
      posts.documents.map(post => <PostCard post={post} key={post.$id}/>)}
    </div>
  );
}

export default Feed;
