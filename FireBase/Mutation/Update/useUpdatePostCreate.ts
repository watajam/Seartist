import { collection, doc, increment, serverTimestamp, setDoc, writeBatch } from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../../lib/firebase';

export const useUpdatePostCreate = () => {
  const router = useRouter();

  const updatePostImageCreate = async (url, data) => {
    const postsRef = doc(collection(db, 'users', auth.currentUser?.email, `posts`));
    const userRef = doc(db, 'users', auth.currentUser?.email);
    const postRef = doc(db, 'users', auth.currentUser?.email, `posts`, postsRef.id);
    
    const batch = writeBatch(db);
    batch.set(postRef, {
      image: url,
      writing: data.writing,
      eventName: data.eventName,
      genre: data.genre,
      location: data.location,
      eventLocation: data.eventLocation,
      eventDate: data.eventDate,
      openTime: data.openTime,
      closeTime: data.closeTime,
      minAmount: data.minAmount,
      maxAmount: data.maxAmount,
      coupon: data.coupon,
      tickets: data.tickets,
      timestamp: serverTimestamp(),
      email: auth.currentUser?.email,
      id: postsRef.id,
      author: userRef.path,
      likeCount: 0,
    });
    batch.update(userRef, { postsCount: increment(1) });
    await batch.commit();

    router.push('/posts');
  };
  const updatePostCreate = async (data) => {
    const postsRef = doc(collection(db, 'users', auth.currentUser?.email, `posts`));
    const userRef = doc(db, 'users', auth.currentUser?.email);
    const postRef = doc(db, 'users', auth.currentUser?.email, `posts`, postsRef.id);

    const batch = writeBatch(db);
    batch.set(postRef, {
      image: '',
      writing: data.writing,
      eventName: data.eventName,
      genre: data.genre,
      location: data.location,
      eventLocation: data.eventLocation,
      eventDate: data.eventDate,
      openTime: data.openTime,
      closeTime: data.closeTime,
      minAmount: data.minAmount,
      maxAmount: data.maxAmount,
      coupon: data.coupon,
      tickets: data.tickets,
      timestamp: serverTimestamp(),
      email: auth.currentUser?.email,
      id: postsRef.id,
      author: userRef.path,
      likeCount: 0,
    });

    batch.update(userRef, { postsCount: increment(1) });
    await batch.commit();

    router.push('/posts');
  };
  return { updatePostImageCreate, updatePostCreate };
};
