import { GetServerSideProps, NextPage } from 'next';
import ProfileLayout from '../../../components/Layout/ProfileLayout';
import Profile from '../../../components/Profile';
import db from '../../../../lib/nodeApp';
import { UserData } from '../../../../types/UserData';
import { PostData } from '../../../../types/PostData';

type Props = {
  userInfo: UserData[];
  posts: Omit<PostData, 'emial'>[];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const userInfo: UserData[] = [];
  const posts: Omit<PostData, 'emial'>[] = [];

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

  return {
    props: {
      userInfo,
      posts,
    },
  };
};

const ProfilePage: NextPage<Props> = (props) => {
  const { userInfo, posts } = props;

  return (
    <ProfileLayout>
      <Profile user={userInfo[0]} postsLength={posts.length} />
    </ProfileLayout>
  );
};

export default ProfilePage;
