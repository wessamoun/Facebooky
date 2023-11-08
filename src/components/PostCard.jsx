/* eslint-disable react/prop-types */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useDeletePost, useDeleteSavedPost, useGetCurrentUser, useSavePost, useUpdatePost } from "../lib/Rquery/RTQApi";
import likedImage from "/assets/icons/liked.svg"
import likeImage from "/assets/icons/like.svg"
import saveImage from "/assets/icons/save.svg"
import savedImage from "/assets/icons/saved.svg"
import { Link } from "react-router-dom";

function PostCard({ post }) {
  
  const user = useSelector((state) => state.user.user);
  const [liked, setLiked] = useState(false);
  const [saved, setSaved] = useState(false);
  const likesList = post.likes.map((user) => user.$id);
  const [likes, setLikes] = useState(likesList);
  const { data: currentUser } = useGetCurrentUser();
  const { mutateAsync: deletePost, isPending: isDeleting } = useDeletePost();
  const { mutateAsync: savePost, isPending: isSaving} = useSavePost();
  const { mutateAsync: deleteSavedPost, isPending: isDeletingSaving } = useDeleteSavedPost();
  const { mutateAsync: updatePost} = useUpdatePost();
  const savedPostRecord = (currentUser) && currentUser?.save.find(
  (record) => record.post.$id === post.$id
  );
  useEffect(()=> {
    likes.includes(user.$id) ? setLiked(true) : setLiked(false);
  },[likes])
  useEffect(()=> {
    setSaved(!!savedPostRecord);
  },[currentUser])
  const like = (e) => {
    
    e.stopPropagation();
    
    let likesArray = [...likes];
    
    if (likesArray.includes(user.$id)) {
      likesArray = likesArray.filter((Id) => Id !== user.$id);
    } else {
      likesArray.push(user.$id);
    }
    setLikes(likesArray);
    updatePost({ postId: post.$id, likesArray });
  };
  const save = (e) => {
    e.stopPropagation();
    
    if (savedPostRecord) {
      setSaved(false)
      deleteSavedPost(savedPostRecord.$id)
    } else {
      savePost({userId: user.$id, postId: post.$id})
      setSaved(true);
    }
    
  };


  function formatDateString(dateString) {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
    };

    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString("en-US", options);

    const time = date.toLocaleTimeString([], {
      hour: "numeric",
      minute: "2-digit",
    });

    return `${formattedDate} at ${time}`;
  }

  const multiFormatDateString = (timestamp) => {
    const timestampNum = Math.round(new Date(timestamp).getTime() / 1000);
    const date = new Date(timestampNum * 1000);
    const now = new Date();

    const diff = now.getTime() - date.getTime();
    const diffInSeconds = diff / 1000;
    const diffInMinutes = diffInSeconds / 60;
    const diffInHours = diffInMinutes / 60;
    const diffInDays = diffInHours / 24;

    switch (true) {
      case Math.floor(diffInDays) >= 30:
        return formatDateString(timestamp);
      case Math.floor(diffInDays) === 1:
        return `${Math.floor(diffInDays)} day ago`;
      case Math.floor(diffInDays) > 1 && diffInDays < 30:
        return `${Math.floor(diffInDays)} days ago`;
      case Math.floor(diffInHours) >= 1:
        return `${Math.floor(diffInHours)} hours ago`;
      case Math.floor(diffInMinutes) >= 1:
        return `${Math.floor(diffInMinutes)} minutes ago`;
      default:
        return "Just now";
    }
  };

  return (
    <div className="bg-bg p-5 rounded-xl border-gray border">
      <div className="flex justify-between">
        <Link to={"/profile/" + post.creator.$id} className="profile flex justify-start items-center gap-3">
          <img
            src={post.creator.imageUrl}
            alt="profileImage"
            className="w-14 rounded-full"
          />
          <div className="info">
            <div className="name font-semibold">{post.creator.name}</div>
            <div className="username text-sm text-cOne">
              {multiFormatDateString(post.$createdAt)}
            </div>
          </div>
        </Link>
        <div
          className={`deletePost text-cOne text-lg cursor-pointer
    ${user.$id === post.creator.$id ? "block" : "hidden"}
    `}
          onClick={() => deletePost({...post})}
        >
          {isDeleting ? (
            <svg
              className="animate-spin h-5 w-5 rounded-full border border-t-gray border-cOne"
              viewBox="0 0 24 24"
            ></svg>
          ) : (
            "X"
          )}{" "}
        </div>
      </div>
      <div className="caption mt-4">{post.caption}</div>
      <div className="tags text-cOne text-xs">{post.tags}</div>
      <img src={post.imageUrl} alt="" className="w-fit rounded-xl mt-5" />
      <div className="engage mt-5 flex justify-between">
        <div className="like flex gap-3 cursor-pointer" onClick={like}>
          <img
            src={liked ? likedImage : likeImage}
            alt="like"
          />
          <div className="likesCount">{likes.length}</div>
        </div>
        <div className="save flex gap-3 cursor-pointer" onClick={save}>
          
          {isSaving ? (
            <svg
              className="animate-spin h-5 w-5 rounded-full border border-t-gray border-cOne"
              viewBox="0 0 24 24"
            ></svg>
          ) : isDeletingSaving ? (
            <svg
              className="animate-spin h-5 w-5 rounded-full border border-t-gray border-cOne"
              viewBox="0 0 24 24"
            ></svg>
          ) : <img
            src={saved ? savedImage : saveImage}
            alt="save"
          />}
        </div>
      </div>
    </div>
  );
}

export default PostCard;
