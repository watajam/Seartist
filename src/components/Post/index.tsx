import { collection, doc, onSnapshot, orderBy, query } from '@firebase/firestore';
import { useRouter } from 'next/router';
import React, { memo, useEffect, useState, VFC } from 'react';
import { db } from '../../../lib/firebase';
import { FormData } from '../../../types/FormData';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import SkeletonLoading from '../SkeletonLoading';
import ListItem from './ListItem';

const Post: VFC = () => {
  const [posts, setPosts] = useState<
    Pick<
      FormData,
      'id' | 'image' | 'writing' | 'eventName' | 'genre' | 'eventLocation' | 'eventDate' | 'openTime' | 'closeTime'
    >[]
  >([]);
  const [user, setUser] = useState<Pick<FormData, 'userId' | 'name' | 'image'>>(null);
  const [postLoading, setPostLoading] = useState(true);
  const [userloading, setUserLoading] = useState(true);
  const { userEmail } = useRecoilSetEmail();
  const router = useRouter();

  //データがない場合にselectionページに遷移
  useEffect(() => {
    if (userEmail !== null) {
      const postsRef = doc(db, 'users', userEmail.email);
      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        if (snapshot.data().email !== userEmail.email) {
          router.push('/selection');
        }
      });
      return () => unsubscribe();
    }
  }, [userEmail]);

  // ユーザー情報取得
  useEffect(() => {
    if (userEmail !== null) {
      const postsRef = doc(db, 'users', userEmail.email);
      const unsubscribe = onSnapshot(postsRef, (snapshot) => {
        setUser({
          userId: snapshot.data().userId,
          name: snapshot.data().name,
          image: snapshot.data().image,
        });
        setUserLoading(false);
      });
      return () => unsubscribe();
    }
  }, [userEmail]);

  //ログインしているユーザーのデータを取得
  useEffect(() => {
    if (userEmail !== null) {
      const q = query(collection(db, 'users', userEmail.email, 'posts'), orderBy('timestamp', 'desc'));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        setPosts(
          snapshot.docs.map((doc) => ({
            id: doc.id,
            image: doc.data().image,
            writing: doc.data().writing,
            eventName: doc.data().eventName,
            genre: doc.data().genre,
            eventLocation: doc.data().eventLocation,
            eventDate: doc.data().eventDate,
            openTime: doc.data().openTime,
            closeTime: doc.data().closeTime,
          }))
        );
        setPostLoading(false);
      });

      return () => unsubscribe();
    }
  }, [userEmail]);

  if (postLoading) {
    return <SkeletonLoading />;
  }
  if (userloading) {
    return <SkeletonLoading />;
  }

  if (user === null) {
    return <p>エラー</p>;
  }

  if (posts === []) {
    return <p>エラー</p>;
  }

  if (posts && posts.length === 0) {
    return <p>まだ投稿がありません</p>;
  }

  return (
    <div className="grid gap-6  md:max-w-xl lg:max-w-2xl">
      {posts.map((post) => {
        return <ListItem key={post.id} post={post} user={user} />;
      })}
    </div>
  );
};

export default memo(Post);
