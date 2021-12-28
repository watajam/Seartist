import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  increment,
  serverTimestamp,
  writeBatch,
} from 'firebase/firestore';
import { useRouter } from 'next/router';
import { auth, db } from '../../../lib/firebase';

export const useUpdatePostCreate = () => {
  const router = useRouter();

  const updatePostImageCreate = async (url, data) => {
    const postsRef = doc(collection(db, 'users', auth.currentUser?.email, `posts`));
    const userRef = doc(db, 'users', auth.currentUser?.email);
    const userDoc = await getDoc(userRef);
    const postRef = doc(db, 'users', auth.currentUser?.email, `posts`, postsRef.id);
    const authFollowersRef = collection(db, 'users', auth.currentUser?.email, 'followers');
    const userFollowersDocs = await getDocs(authFollowersRef);

    const batch = writeBatch(db);

    //フォローワーのユーザーにも投稿を追加
    userFollowersDocs.docs.map((document) => {
      const otherPostsByFollowersRef = doc(db, 'users', document.data()?.email, 'postsByFollowers', postsRef.id);
      batch.set(otherPostsByFollowersRef, {
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
    });

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
    batch.update(userRef, { postsIds: arrayUnion(postRef.id) });
    await batch.commit();

    router.push(`/profile/${userDoc.data()?.userId}`);
  };
  const updatePostCreate = async (data) => {
    const postsRef = doc(collection(db, 'users', auth.currentUser?.email, `posts`));
    const userRef = doc(db, 'users', auth.currentUser?.email);
    const userDoc = await getDoc(userRef);
    const postRef = doc(db, 'users', auth.currentUser?.email, `posts`, postsRef.id);
    const authFollowersRef = collection(db, 'users', auth.currentUser?.email, 'followers');
    const userFollowersDocs = await getDocs(authFollowersRef);

    const batch = writeBatch(db);

    //フォローワーのユーザーにも投稿を追加
    userFollowersDocs.docs.map((document) => {
      const otherPostsByFollowersRef = doc(db, 'users', document.data()?.email, 'postsByFollowers', postsRef.id);
      batch.set(otherPostsByFollowersRef, {
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
    });

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
    batch.update(userRef, { postsIds: arrayUnion(postRef.id) });
    await batch.commit();

    router.push(`/profile/${userDoc.data()?.userId}`);
  };
  return { updatePostImageCreate, updatePostCreate };
};
