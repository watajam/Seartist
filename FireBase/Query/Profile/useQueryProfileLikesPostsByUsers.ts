import { collection, getDocs, query, where, orderBy, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';
import { PostData } from '../../../types/PostData';

type postsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

//ユーザープロフィール情報を取得する
export const useQueryProfileLikesPostsByUsers = () => {
  const [postsByUser, setPostsByUser] = useState<postsByUsers[]>([]);
  const [postsByUsersLoading, setPostsByUsersLoading] = useState(true);

  const router = useRouter();

  //プロフィールに表示されているユーザーがイイネした投稿を取得
  useEffect(() => {
    const userLikedPosts = async () => {
      if (router.query.id !== undefined) {
        const queryUserInfo = query(collection(db, 'users'), where('userId', '==', router.query.id));
        const userDocs = await getDocs(queryUserInfo);

        const queryLikePosts = query(
          collection(db, 'users', `${userDocs.docs[0].data().email}`, 'likedPosts'),
          orderBy('createTime', 'desc')
        );
        const likedPostsDocs = await getDocs(queryLikePosts);
        if (likedPostsDocs.empty) {
          setPostsByUsersLoading(false);
          setPostsByUser(null);
          return;
        } else {
          likedPostsDocs.docs.map(async (docLikedPosts) => {
            setPostsByUser([]);
            const queryPosts = query(
              collection(db, 'users'),
              where(`postsIds`, 'array-contains', docLikedPosts.data().id)
            );
            const usersDocs = await getDocs(queryPosts);
            const postsDoc = await getDoc(docLikedPosts.data().postRef);

            if (usersDocs.empty && postsDoc.data.length === 0) {
              setPostsByUsersLoading(false);
              setPostsByUser(null);
            } else {
              setPostsByUser((prevPostsByUsers) => {
                return [
                  ...prevPostsByUsers,
                  {
                    ...(postsDoc.data() as PostData),
                    name: usersDocs.docs[0].data().name,
                    profilePhoto: usersDocs.docs[0].data().profilePhoto,
                    email: usersDocs.docs[0].data().email,
                    userId: usersDocs.docs[0].data().userId,
                  },
                ];
              });
            }
          });
          setPostsByUsersLoading(false);
        }
      }
    };
    userLikedPosts();
  }, [router]);

  return { postsByUser, postsByUsersLoading };
};