import { GetServerSideProps, NextPage } from 'next';
import ProfileLayout from '../../../components/Layout/ProfileLayout';
import Profile from '../../../components/Profile';
import db from '../../../../lib/nodeApp';
import { UserData } from '../../../../types/UserData';
import { useModalOpenAndClose } from '../../../hooks/useModalOpenAndClose';

type Props = {
  userInfo: UserData[];
};

//ユーザの情報を取得する
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  const userInfo: Omit<UserData, 'followingFlag'>[] = [];

  try {
    const userRef = db.collection('users');
    const userSnap = await userRef.where('userId', '==', id).get();

    try {
      userSnap.forEach((doc) => {
        const data = doc.data();
        userInfo.push({
          profilePhoto: data.profilePhoto ? data.profilePhoto : '',
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
  } catch (e) {
    console.log('Error getting documents: ', e);
  }

  return {
    props: {
      userInfo,
    },
  };
};

//プロフィールページ
const ProfilePage: NextPage<Props> = (props) => {
  const { userInfo } = props;
  const { isOpen, openModal, closeModal } = useModalOpenAndClose();

  return (
    <ProfileLayout openModal={openModal}>
      <Profile user={userInfo[0]} closeModal={closeModal} isOpen={isOpen} />
    </ProfileLayout>
  );
};

export default ProfilePage;
