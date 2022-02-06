import { GetServerSideProps, NextPage } from 'next';
import ProfileLayout from '../../../components/Layout/ProfileLayout';
import Profile from '../../../components/Profile';
import db from '../../../../lib/nodeApp';
import { UserData } from '../../../../types/UserData';
import { useModalOpenAndClose } from '../../../hooks/useModalOpenAndClose';
import ProfileModal from '../../../components/Profile/ProfileModal';

type Props = {
  userInfo: UserData;
  status: string;
};

//ユーザの情報を取得する
export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { id } = ctx.query;
  let userInfo: Omit<UserData, 'followingFlag'> = null;

  try {
    const userRef = db.collection('users');
    const userSnap = await userRef.where('userId', '==', id).get();
    if (userSnap.empty) throw new Error('ユーザが存在しません');

    userSnap.forEach((doc) => {
      const data = doc.data();

      userInfo = {
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
      };
    });
    return {
      props: {
        userInfo,
      },
    };
  } catch (e) {
    if (e instanceof Error) {
      return { props: { status: e.message } };
    }
  }
};

//プロフィールページ
const ProfilePage: NextPage<Props> = (props) => {
  const { userInfo, status } = props;
  const { isOpen, openModal, closeModal } = useModalOpenAndClose();

  return (
    <>
      <ProfileLayout openModal={openModal}>
        <Profile user={userInfo} error={status} />
      </ProfileLayout>

      {/* プロフィールモーダル */}
      <ProfileModal closeModal={closeModal} isOpen={isOpen} />
    </>
  );
};

export default ProfilePage;
