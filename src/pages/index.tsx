import { onAuthStateChanged } from '@firebase/auth';
import { doc, getDoc } from '@firebase/firestore';
import { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect} from 'react';
import { auth, db } from '../../lib/firebase';

const Home: NextPage = () => {
  const router = useRouter();

  // 自動ログイン
  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      if (user) {
        const postsRef = doc(db, 'users', user.email);
        const userCheck = async () => {
          const docSnap = await getDoc(postsRef);
          if (docSnap.data().email === user.email) {
            router.push('/posts');
          } else {
            router.push('/selection');
          }
        };
        userCheck();
      }
    });

    return () => unSub();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen">
      <Link href="/login">
        <a className="inline-block text-base text-orange-200 underline cursor-pointer hover:text-orange-400 ">
          ログインページへ
        </a>
      </Link>
    </div>
  );
};

export default Home;
