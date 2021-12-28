import { collection, getDocs, query, where, orderBy, onSnapshot, getDoc } from '@firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';
import { PostData } from '../../../types/PostData';

//ユーザープロフィール情報を取得する
export const useQueryProfileLikesPostsUsers = () => {
  const [posts, setPosts] = useState<Omit<PostData, `email`>[]>(null);
  const [users, setUsers] = useState<UserData[]>(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  //プロフィールに表示されているユーザーがイイネした投稿を取得
  useEffect(() => {
    const userLikedPosts = async () => {
      const queryUserInfo = query(collection(db, 'users'), where('userId', '==', router.query.id));
      const userRef = await getDocs(queryUserInfo);

      const queryLikePosts = query(
        collection(db, 'users', `${userRef.docs[0].data().email}`, 'likedPosts'),
        orderBy('createTime', 'desc')
      );

      const unSub = onSnapshot(queryLikePosts, (querySnapshot) => {
        if (querySnapshot.empty) {
          setPosts(null);
          setUsers(null);

          setLoading(false);
          return;
        } else {
          querySnapshot.forEach(async (doc) => {
            setPosts([]);
            setUsers([]);

            const postsRef = await getDoc(doc.data().postRef);

            setPosts((prev) => [...prev, postsRef.data() as PostData]);

            const queryPosts = query(collection(db, 'users'), where(`postsIds`, 'array-contains', doc.data().id));
            const userRef = await getDocs(queryPosts);
            setUsers((prevUsers) => [...prevUsers, userRef.docs[0].data() as UserData]);
          });
        }
        setLoading(false);
      });
      return () => unSub();
    };
    userLikedPosts();
  }, [router]);

  return { posts, users, loading };
};
