import { collection, getDocs, query, where, orderBy, getDoc } from '@firebase/firestore';
import { NextRouter } from 'next/router';
import { useCallback } from 'react';
import { db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';
import { PostData } from '../../../types/PostData';

type PostsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

//proflieページにログインしているユーザーがいいねした投稿データを表示
export const useQueryProfileLikesPostsByUsers = () => {
  const queryUser = useCallback(async (router: NextRouter) => {
    let user: UserData;
    const queryUserInfo = query(collection(db, 'users'), where('userId', '==', router.query.id));
    const userDocs = await getDocs(queryUserInfo);

    userDocs.docs.map(async (docUser) => {
      user = docUser.data() as UserData;
    });

    return user;
  }, []);

  const queryProfileLikedPostsByUsers = useCallback(async (email: string) => {
    let likedPosts: PostData[] = [];

    const queryLikePosts = query(collection(db, 'users', `${email}`, 'likedPosts'), orderBy('createTime', 'desc'));
    const likedPostsDocs = await getDocs(queryLikePosts);
    likedPostsDocs.docs.map((doc) => {
      likedPosts.push(doc.data() as PostData);
    });
    return likedPosts;
  }, []);

  const queryUsersByLikedPosts = useCallback(async (likedPosts: PostData[]) => {
    let usersByLikedPosts: PostsByUsers[] = [];

    const result = await Promise.all(
      likedPosts.map(async (likedPost) => {
        const queryPosts = query(collection(db, 'users'), where(`postsIds`, 'array-contains', likedPost.id));
        const usersDocs = await getDocs(queryPosts);
        const postsDoc = await getDoc(likedPost.postRef);

        usersByLikedPosts.push({
          ...(postsDoc.data() as PostData),
          name: usersDocs.docs[0].data().name,
          userId: usersDocs.docs[0].data().userId,
          profilePhoto: usersDocs.docs[0].data().profilePhoto,
          email: usersDocs.docs[0].data().email,
        });
      })
    );
    return usersByLikedPosts;
  }, []);

  return { queryUser, queryProfileLikedPostsByUsers, queryUsersByLikedPosts };
};
