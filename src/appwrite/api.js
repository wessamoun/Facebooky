import { ID, Permission, Query, Role } from "appwrite";
import { account, appwriteConfig, avatars, databases, storage } from "./config";

export async function createAccount(values) {
  try {
    const newAccount = await account.create(
      ID.unique(),
      values.email,
      values.password,
      values.name
    );

    if (!newAccount) throw Error;

    const avatarUrl = avatars.getInitials(newAccount.name);

    if (!avatarUrl) throw Error;

    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email: newAccount.email,
        name: newAccount.name,
        username: values.username,
        imageUrl: avatarUrl,
      }
    );

    return newUser;
  } catch (err) {
    console.log(err);
  }
}

export async function signIn(values) {
  try {
    const newSession = await account.createEmailSession(
      values.email,
      values.password
    );

    if (!newSession) throw Error;

    return newSession;
  } catch (error) {
    console.log(error);
  }
}

export async function getAccount() {
  try {
    const currentAccount = await account.get();

    return currentAccount;
  } catch (error) {
    console.log(error);
  }
}

export async function getCurrentUser() {
  try {
    const currentAccount = await getAccount();


    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal("accountId", currentAccount.$id)]
    );


    if (!currentUser) throw Error;

    return currentUser.documents[0];
  } catch (error) {
    console.log(error);
  }
}

export async function logOut() {
  try {
    const logOut = await account.deleteSessions();

    if (!logOut) throw Error;

    localStorage.removeItem("cookieFallback");

    // location.reload()
  } catch (error) {
    console.log(error);
  }
}

export async function uploadFile(file) {
  try {
    if (file !== undefined) {
      const uploadedFile = await storage.createFile(
        appwriteConfig.storageId,
        ID.unique(),
        file
      );
      return uploadedFile;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function createPost(values) {
  try {
    const uploadedFile = await uploadFile(values.image[0]);

    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      uploadedFile?.$id || ""
    );

    const tagsArray = values.tags.split(",");

    const post = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      ID.unique(),
      {
        creator: values.userId,
        caption: values.caption,
        tags: tagsArray,
        imageUrl: fileUrl || "",
        imageId: uploadedFile?.$id,
        location: values.location,
      }
    );
    if (!post) {
      await deleteFile(uploadedFile?.$id);
      throw Error;
    }
    return post;
  } catch (error) {
    console.log(error);
  }
}
export async function editProfile(values) {
  try {
    const uploadedFile = await uploadFile(values.file);

    const fileUrl = storage.getFilePreview(
      appwriteConfig.storageId,
      uploadedFile?.$id || ""
    );


    const user = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      values.userId,
      {
        name: values.name,
        imageUrl: fileUrl,
        bio: values.bio
      }
    );
    if (!user) {
      await deleteFile(uploadedFile?.$id);
      throw Error;
    }
    return user;
  } catch (error) {
    console.log(error);
  }
}

export async function getPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.orderDesc("$createdAt")]
    );
    return posts;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteFile(fileId) {
  try {
    if (fileId !== undefined) {
      await storage.deleteFile(appwriteConfig.storageId, fileId);
      return { status: "ok" };
    }
  } catch (error) {
    console.log(error);
  }
}
export async function deletePost(post) {
  try {
    await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      post.$id
    );
    await storage.deleteFile(appwriteConfig.storageId, post.imageId);
    return { status: "ok" };
  } catch (error) {
    console.log(error);
  }
}
export async function updatePost(values) {
  try {
    const updatedPost = await databases.updateDocument(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      values.postId,
      {
        likes: values.likesArray,
      },
      [Permission.update(Role.any())]
    );
    return updatedPost;
  } catch (error) {
    console.log(error);
  }
}

export async function savePost(values) {
  try {
    const savedPost = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      ID.unique(),
      {
        user: values.userId,
        post: values.postId,
      }
    );
    return savedPost;
  } catch (error) {
    console.log(error);
  }
}
export async function deleteSavedPost(savedId) {
  try {
    const statusCode = await databases.deleteDocument(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      savedId
    );

    if (!statusCode) throw Error;

    return { status: "Ok" };
  } catch (error) {
    console.log(error);
  }
}
export async function getSavedPosts() {
  try {
    const posts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.savesCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return posts;
  } catch (error) {
    console.log(error);
  }
}
export async function getUsers() {
  try {
    const users = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.orderDesc("$createdAt")]
    );

    return users;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserPosts(userId) {
  try {
    const userPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("creator", [userId])]
    );
    
    return userPosts;
  } catch (error) {
    console.log(error);
  }
}
export async function getLikedPosts(userId = []) {

  try {
    const userPosts = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.postCollectionId,
      [Query.equal("$id", [...userId,"@"])]
    );
    return userPosts;
  } catch (error) {
    console.log(error);
  }
}
export async function getUserById(userId) {
  try {
    const user = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      userId
    );
    return user;
  } catch (error) {
    console.log(error);
  }
}
