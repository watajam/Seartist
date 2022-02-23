import { collectionGroup, query, where, getDocs, doc, getDoc } from '@firebase/firestore';
import { db } from '../../../lib/firebase';
import { PostDetailData } from '../../../types/PostDetailData';
import { UserData } from '../../../types/UserData';

type PostByUser = Omit<PostDetailData, 'email'> & Pick<UserData, 'name' | 'profilePhoto' | 'email'>;

//プロフィールページにログインしているユーザーの投稿データを表示
export const useQueryPostByUserDetail = () => {
  const queryDetailPost = async (router) => {
    let post: PostDetailData;

    const q = query(collectionGroup(db, 'posts'), where('id', '==', router.query.id));
    const postDocs = await getDocs(q);

    post = postDocs.docs[0].data() as PostDetailData;

    return post;
  };

  const queryDetailPostByUser = async (post: PostDetailData) => {
    let postsByUsers: PostByUser;

    const q = doc(db, 'users', post?.email);
    const userDoc = await getDoc(q);

    const userData = userDoc.data() as Pick<UserData, 'name' | 'profilePhoto' | 'email'>;

    postsByUsers = {
      ...(post as PostDetailData),
      name: userData.name,
      profilePhoto: userData.profilePhoto,
      email: userData.email,
    };

    return postsByUsers;
  };
  return { queryDetailPost, queryDetailPostByUser };
};
