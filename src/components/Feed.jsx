import { useGetPosts } from "../lib/Rquery/RTQApi";
import Loading from "./Loading";
import PostCard from "./PostCard";

function Feed() {
  const {
    data: posts,
    isPending: isPostLoading,
  } = useGetPosts();
  return (
    <div className="flex flex-col flex-1 h-screen mb-20 md:mb-0 text-white pt-12 px-8 overflow-scroll gap-6 transition-all">
      <div className=" text-3xl font-bold flex flex-col mt-12 md:mt-0">Home Feed</div>
      {isPostLoading ? <Loading/> :
      posts.documents.map(post => <PostCard post={post} key={post.$id}/>)}
    </div>
  );
}

export default Feed;
