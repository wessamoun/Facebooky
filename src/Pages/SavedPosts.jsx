import Loading from "../components/Loading";
import PostCard from "../components/PostCard";
import { useSavedPosts } from "../lib/Rquery/RTQApi";

function SavedPosts() {
  const {
    data: posts,
    isLoading: isPostLoading,
  } = useSavedPosts();
  return (
    <div className="flex flex-col flex-1 h-screen text-white pt-12 px-8 overflow-scroll gap-6 transition-all">
      <div className=" text-3xl font-bold flex flex-col ">Home Feed</div>
      {isPostLoading ? <Loading/> :
      posts.documents.map(post => <PostCard post={post.post} key={post.$id}/>)}
    </div>
  );
}

export default SavedPosts;
