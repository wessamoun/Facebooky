import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  createAccount,
  createPost,
  deletePost,
  getPosts,
  getSavedPosts,
  getUsers,
  getUserById,
  savePost,
  signIn,
  updatePost,
  getUserPosts,
  getLikedPosts,
} from "../../appwrite/api";
import { QUERY_KEYS } from "./queryKeys";

export const useCreateAccount = () =>
  useMutation({
    mutationFn: (values) => createAccount(values),
  });

export const useSignIn = () =>
  useMutation({
    mutationFn: (values) => signIn(values),
  });

export const useCreatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (user, values) => createPost(user, values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
export const useSavePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => savePost(values),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      });
    },
  });
};
export const useUpdatePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (values) => updatePost(values),
    onSuccess: async () => {
      console.log(QUERY_KEYS.GET_RECENT_POSTS);
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_SAVED_POSTS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_LIKED_POSTS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_POSTS],
      });
      await queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_USER_BY_ID],
      });
    },
  });
};
export const useDeletePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (post) => deletePost(post),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [QUERY_KEYS.GET_RECENT_POSTS],
      });
    },
  });
};
export const useGetPosts = () => {
  return useQuery({ queryKey: [QUERY_KEYS.GET_RECENT_POSTS], queryFn: getPosts });
};
export const useSavedPosts = () => {
  return useQuery({ queryKey: [QUERY_KEYS.GET_SAVED_POSTS], queryFn: getSavedPosts });
};
export const useGetUsers = () => {
  return useQuery({ queryKey: [QUERY_KEYS.GET_USERS], queryFn: getUsers });
};
export const useGetUserById = (userId) => {
  return useQuery({ queryKey: [QUERY_KEYS.GET_USER_BY_ID], queryFn:() => getUserById(userId)})
}
export const useGetUserPosts = (userId) => {
  return useQuery({ queryKey: [QUERY_KEYS.GET_USER_POSTS], queryFn:() => getUserPosts(userId) });
}
export const useGetLikedPosts = (userId) => {
  return useQuery({ queryKey: [QUERY_KEYS.GET_LIKED_POSTS], queryFn:() => getLikedPosts(userId) });
}