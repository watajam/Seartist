import db from '../../../lib/nodeApp';
import { PostData } from '../../../types/PostData';
import { UserData } from '../../../types/UserData';

//ログインしている人の情報を取得する
export const useQueryUserProfile = () => {
  const userInfo: Omit<UserData, 'likePostCount' | 'postsCount'>[] = [];
  const posts: Omit<PostData, 'emial'>[] = [];

  const queryUserProfileInfo = async (id) => {
    try {
      const userRef = db.collection('users');
      const userSnap = await userRef.where('userId', '==', id).get();

      try {
        userSnap.forEach((doc) => {
          const data = doc.data();
          userInfo.push({
            image: data.image ? data.image : '',
            name: data?.name,
            userId: data?.userId,
            genre: data?.genre ? data?.genre : '',
            location: data?.location ? data?.location : '',
            birthday: data?.birthday ? data?.birthday : '',
            writing: data?.writing ? data?.writing : '',
            twitterUrl: data?.twitterUrl ? data?.twitterUrl : '',
            instagramUrl: data?.instagramUrl ? data?.instagramUrl : '',
            homepageUrl: data?.homepageUrl ? data?.homepageUrl : '',
            otherUrl: data?.otherUrl ? data?.otherUrl : '',
            email: data?.email,
          });
        });
        const postsRef = db.collection(`users`).doc(`${userInfo[0].email}`).collection('posts');
        const postsSnapshot = await postsRef.orderBy('timestamp', 'desc').get();
        postsSnapshot.forEach((doc) => {
          const postsData = JSON.parse(JSON.stringify(doc.data()));
          posts.push(postsData);
        });
      } catch (e) {
        console.log('Error getting documents: ', e);
      }
    } catch (e) {
      console.log('Error getting documents: ', e);
    }
  };

  return { queryUserProfileInfo, userInfo, posts };
};
