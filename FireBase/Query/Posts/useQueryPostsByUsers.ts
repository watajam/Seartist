import { collection, orderBy, query, getDocs, where } from '@firebase/firestore';
import { db } from '../../../lib/firebase';
import { useRecoilSetEmail } from '../../../src/hooks/useRecoilSetEmail';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';

type postsByUsers = Omit<PostData, 'email'> & Pick<UserData, 'userId' | 'name' | 'profilePhoto' | 'email'>;

//postsページにログインしているユーザーの投稿データを表示
export const useQueryPostsByUsers = () => {
  const { userEmail } = useRecoilSetEmail();

  const queryPostsByFollowings = async () => {
    let posts: PostData[] = [];

    const q = query(collection(db, 'users', `${userEmail.email}`, 'postsByFollowing'), orderBy('timestamp', 'desc'));
    const postsByFollowerDocs = await getDocs(q);

    postsByFollowerDocs.docs.map(async (docPosts) => {
      posts.push(docPosts.data() as PostData);
    });

    return posts;
  };

  const queryPostsByUsers = async (posts: PostData[]) => {
    let postsByUsers: postsByUsers[] = [];

    const result = await Promise.all(
      posts?.map(async (docPosts) => {
        const queryPosts = query(collection(db, 'users'), where(`postsIds`, 'array-contains', docPosts?.id));
        const userDocs = await getDocs(queryPosts);

        postsByUsers.push({
          ...(docPosts as PostData),
          name: userDocs.docs[0].data().name,
          userId: userDocs.docs[0].data().userId,
          profilePhoto: userDocs.docs[0].data().profilePhoto,
          email: userDocs.docs[0].data().email,
        });
      })
    );

    return postsByUsers;
  };

  return { queryPostsByFollowings, queryPostsByUsers };
};
