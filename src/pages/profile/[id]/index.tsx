import { GetServerSideProps, NextPage } from 'next';
import ProfileLayout from '../../../components/Layout/ProfileLayout';
import Profile from '../../../components/Profile';
import db from '../../../../lib/nodeApp';
import { UserData } from '../../../../types/UserData';

type Props = {
  userInfo: UserData[];
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const userInfo: UserData[] = [];

  try {
    if (!id) {
      return;
    } else {
      const userRef = db.collection('users');
      const userSnap = await userRef.where('userId', '==', id).get();

      try {
        userSnap.forEach((doc) => {
          const data = doc.data();
          userInfo.push({
            profilePhoto: data?.profilePhoto ? data?.profilePhoto : '',
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
            likePostCount: data?.likePostCount ? data?.likePostCount : 0,
            postsCount: data?.postsCount ? data?.postsCount : 0,
            followUsersCount: data?.followUsersCount ? data?.followUsersCount : 0,
            followerUsersCount: data?.followerUsersCount ? data?.followerUsersCount : 0,
          });
        });
      } catch (e) {
        console.log('Error getting documents: ', e);
      }
    }
  } catch (e) {
    console.log('Error getting documents: ', e);
  }

  return {
    props: {
      userInfo,
    },
  };
};

const ProfilePage: NextPage<Props> = (props) => {
  const { userInfo } = props;

  return (
    <ProfileLayout>
      <Profile user={userInfo[0]} />
    </ProfileLayout>
  );
};

export default ProfilePage;
