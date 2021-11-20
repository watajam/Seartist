import React, { memo, useCallback, useEffect, useState, VFC } from 'react';
import { collection, doc, onSnapshot, orderBy, query, where } from '@firebase/firestore';
import { db } from '../../../lib/firebase';
import { useRouter } from 'next/dist/client/router';
import { FormData } from '../../../types/FormData';
import { useRecoilSetEmail } from '../../hooks/useRecoilSetEmail';
import ProfileUser from './ProfileUser';
import PostProfile from '../Post/PostProfile';
import ProfileTab from './ProfileTab';

type Props = {
  user: {
    image: string;
    name: string;
    userId: string;
    genre: string;
    location: string;
    birthday: string;
    writing: string;
    twitterUrl: string;
    instagramUrl: string;
    homepageUrl: string;
    otherUrl: string;
    email: string;
  };
  postsLength: number;
};

const Profile: VFC<Props> = (props) => {
  const [user, setUser] =
    useState<
      Pick<
        FormData,
        | 'image'
        | 'name'
        | 'userId'
        | 'genre'
        | 'location'
        | 'birthday'
        | 'writing'
        | 'image'
        | 'twitterUrl'
        | 'instagramUrl'
        | 'homepageUrl'
        | 'otherUrl'
        | 'email'
      >
    >(null);
  const [posts, setPosts] = useState<
    Pick<
      FormData,
      'id' | 'image' | 'writing' | 'eventName' | 'genre' | 'eventLocation' | 'eventDate' | 'openTime' | 'closeTime'
    >[]
  >([]);
  const [chengePage, setChengePage] = useState(true);
  const { userEmail } = useRecoilSetEmail();
  const [userLoading, setUserLoading] = useState(true);
  const [postsLoading, setPostsLoading] = useState(true);
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

  const handleChengePage = useCallback(() => {
    setChengePage((prevChengePage) => {
      return !prevChengePage;
    });
  }, []);

  useEffect(() => {
    const userRef = collection(db, 'users');

    if (router.query.id !== 'undefined') {
      const q = query(userRef, where('userId', '==', `${router.query.id}`));

      const unsubscribe = onSnapshot(q, (snapshot) => {
        if (snapshot.docs.length !== 0) {
          setUser({
            image: snapshot.docs[0].data().image,
            name: snapshot.docs[0].data().name,
            userId: snapshot.docs[0].data().userId,
            genre: snapshot.docs[0].data().genre,
            location: snapshot.docs[0].data().location,
            birthday: snapshot.docs[0].data().birthday,
            writing: snapshot.docs[0].data().writing,
            twitterUrl: snapshot.docs[0].data().twitterUrl,
            instagramUrl: snapshot.docs[0].data().instagramUrl,
            homepageUrl: snapshot.docs[0].data().homepageUrl,
            otherUrl: snapshot.docs[0].data().otherUrl,
            email: snapshot.docs[0].data().email,
          });
        } else {
          alert('存在しないページです');
        }

        setUserLoading(false);
      });
      return () => unsubscribe();
    }
  }, [router.query.id]);

  useEffect(() => {
    if (user?.email !== undefined) {
      const q = query(collection(db, 'users', `${user.email}`, 'posts'), orderBy('timestamp', 'desc'));
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
        setPostsLoading(false);
      });
      return () => unsubscribe();
    }
  }, [user]);

  return (
    <>
      <div className="px-5">
        <ProfileUser
          user={props.user}
          postsLength={props.postsLength}
        />
      </div>

      {/* タブ */}
      <div className="mt-6 flex">
        <ProfileTab user={props.user} handleChengePage={handleChengePage} chengePage={chengePage} />
      </div>

      <div className="px-5 mt-4 grid gap-6  md:max-w-xl lg:max-w-2xl">
        <PostProfile posts={posts} user={user} userLoading={userLoading} postsLoading={postsLoading} />
      </div>
    </>
  );
};

export default memo(Profile);
