import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { useSavedPosts } from "../lib/Rquery/RTQApi";

function SavedPosts() {
  const {
    data: posts,
    isLoading: isPostLoading,
  } = useSavedPosts();
  return (
    <div className="flex flex-col flex-1 h-screen text-white pt-12 px-8 overflow-scroll gap-6 transition-all mb-20 md:mb-0">
      <div className=" text-3xl font-bold flex flex-col mt-12 md:mt-0 ">Home Feed</div>
      {isPostLoading ? <Loading/> : posts.documents.length === 0 ? "No Saved Posts" :
      posts.documents.map(post => <PostCard post={post.post} key={post.$id}/>)}
    </div>
  );
}

export default SavedPosts;
