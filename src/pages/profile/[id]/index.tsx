import { GetServerSideProps, NextPage } from 'next';
import { FormData } from '../../../../types/FormData';
import ProfileLayout from '../../../components/Layout/ProfileLayout';
import Profile from '../../../components/Profile';
import db from '../../../../lib/nodeApp';

type Props = {
  profile: Pick<
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
  >[];
  posts: Pick<
    FormData,
    'id' | 'image' | 'writing' | 'eventName' | 'genre' | 'eventLocation' | 'eventDate' | 'openTime' | 'closeTime'
  >[];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  // const db = admin.firestore()
  const profile: Pick<
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
  >[] = [];
  const posts: Pick<
    FormData,
    'id' | 'image' | 'writing' | 'eventName' | 'genre' | 'eventLocation' | 'eventDate' | 'openTime' | 'closeTime'
  >[] = [];

  try {
    const userRef = db.collection('users');
    const userSnapshot = await userRef.where('userId', '==', id).get();

    userSnapshot.forEach((doc) => {
      const data = doc.data();
      profile.push({
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
    try {
      const postsRef = db.collection(`users`).doc(`${profile[0].email}`).collection('posts');
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
      profile,
      posts,
    },
  };
};

const ProfilePage: NextPage<Props> = (props) => {
  const { profile, posts } = props;

  return (
    <ProfileLayout>
      <Profile user={profile[0]} postsLength={posts.length} />
    </ProfileLayout>
  );
};

export default ProfilePage;
