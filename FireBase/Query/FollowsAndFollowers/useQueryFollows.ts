import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { db } from '../../../lib/firebase';
import { UserData } from '../../../types/UserData';

//フォロー欄にフォローしているユーザーのリストを表示する
export const useQueryFollows = () => {
  const [follows, setFollows] = useState<
    Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email' | 'followingFlag'>[]
  >([]);
  const [followsLoading, setFollowsLoading] = useState(true);
  const [error, setError] = useState(null);
  const router = useRouter();
  const [authEmail, setAuthEmail] = useState('');

  useEffect(() => {
    const follow = async () => {
      if (router.query?.id === undefined) {
        return;
      }
      const userRef = collection(db, 'users');
      const queryUserInfo = query(userRef, where('userId', '==', `${router.query?.id}`));
      const userInfoDocs = await getDocs(queryUserInfo);
      if (userInfoDocs.empty) {
        setFollowsLoading(false);
        setError('ユーザーが存在しません');
        return;
      } else {
        const followsRef = query(
          collection(db, 'users', userInfoDocs.docs[0].data()?.email, 'following'),
          orderBy('createTime', 'desc')
        );
        setAuthEmail(userInfoDocs.docs[0].data()?.email);
        //フォロワーユーザーの情報を取得
        const followsDocs = await getDocs(followsRef);
        if (followsDocs.empty) {
          setFollowsLoading(false);
          return;
        } else {
          followsDocs.docs.map(async (follower) => {
            const userRef = collection(db, 'users');
            const queryUserInfo = query(userRef, where('email', '==', `${follower.data()?.email}`));
            const querySnapUserInfo = await getDocs(queryUserInfo);
            if (querySnapUserInfo.empty) {
              setFollowsLoading(false);
              setError('ユーザーが存在しません');
              return;
            } else {
              setFollows((prev) => {
                return [
                  ...prev,
                  {
                    followingFlag: follower.data()?.following,
                    userId: querySnapUserInfo.docs[0].data()?.userId,
                    name: querySnapUserInfo.docs[0].data()?.name,
                    profilePhoto: querySnapUserInfo.docs[0].data()?.profilePhoto,
                    email: querySnapUserInfo.docs[0].data()?.email,
                  },
                ];
              });
              setFollowsLoading(false);
              setError(null);
            }
          });
        }
      }
    };
    follow();
  }, [router.query.id]);

  return { follows, followsLoading, error, authEmail };
};
