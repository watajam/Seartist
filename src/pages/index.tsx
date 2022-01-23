import { NextPage } from 'next';
import { AiTwotoneHeart } from 'react-icons/ai';
import { FaSearch, FaUser, FaUserPlus } from 'react-icons/fa';
import { RiQuillPenLine} from 'react-icons/ri';
import Footer from '../components/Footer';
import TopPageHerader from '../components/Header/TopPageHerader';
import ButtonItem from '../components/TopPage/ButtonItem';
import FeatureListItem from '../components/TopPage/FeatureListItem';
import Hero from '../components/TopPage/Hero';
import TitleItem from '../components/TopPage/TitleItem';

const Feature_Lists_Item = [
  {
    title: 'プロフィール',
    subTitle: '(リスナーは一部機能のみ)',
    text: 'プロフィール登録の際に、各情報を入力する事でSNSアカウントやホームページのURLをプロフィール上に表示できます。',
    image: '/profilePage.png',
    icon: <FaUser className="w-7 h-7 inline-block  mb-1" />,
  },
  {
    bgColor: 'bg-gray-300',
    title: 'フォロー、フォロワー機能',
    text: '気になるアーティストやイベント主催者をフォローする事で、最新のイベントをチェックすることができます。',
    image: '/homePage.png',
    icon: <FaUserPlus className="w-7 h-7 inline-block  mb-1" />,
  },
  {
    title: 'イイネ機能',
    text: 'イイネする事で、プロフィールページに表示されます。気になる投稿をイイねして、アーティストやイベント主催者を応援しましょう',
    image: '/like.png',
    icon: <AiTwotoneHeart className="w-7 h-7 inline-block  mb-1" />,
  },
  {
    bgColor: 'bg-gray-300',
    title: '検索機能',
    text: 'ユーザー名、ユーザーID、出身地、都道府県、ジャンル、開催日から絞って検索可能お気に入りのアーティストやイベントを見つけよう',
    image: '/search.png',
    icon: <FaSearch className="w-7 h-7 inline-block  mb-1" />,
  },
  {
    title: '投稿機能',
    subTitle: '（クリエターアカウントのみ）',
    text: '各フォームに合わせてイベント内容を記載する事で、イベント情報をリスナーに知ってもらうことができます',
    image: '/post.png',
    icon: <RiQuillPenLine className="w-7 h-7 inline-block  mb-1" />,
  },
];

//LPページ
const TopPage: NextPage = () => {

  return (
    <>
      {/* ヘッダー */}
      <TopPageHerader />

      {/* 機能一覧 */}
      <Hero />

      {/* タイトル１ */}
      <TitleItem title={'各種機能と利用方法'} subTitle="リスナー or クリエター" />

      {/* ファーストビュー　*/}
      {Feature_Lists_Item.map((item) => (
        <FeatureListItem
          bgColor={item?.bgColor}
          title={item.title}
          subTitle={item.subTitle}
          text={item.text}
          image={item.image}
        >
          {item.icon}
        </FeatureListItem>
      ))}

      {/* タイトル２ */}
      <TitleItem title={'Seartistはアーティストや主催者を応援'} subTitle="今後も各種機能をアップデートしていきます" />

      {/* 各ログインボタン */}
      <ButtonItem />

      {/* フッター */}
      <Footer />
    </>
  );
};

export default TopPage;
