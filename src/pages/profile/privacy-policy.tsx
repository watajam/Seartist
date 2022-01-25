import { NextPage } from 'next';
import TermsOfUseAndPrivacyPolicyLayout from '../../components/Layout/TermsOfUseAndPrivacyPolicyLayout';

//プライバシーポリシーページ
const privacypolicy: NextPage = () => {
  return (
    <TermsOfUseAndPrivacyPolicyLayout>
      <h1>当アプリ（Seartist）における個人情報の取扱いについて、以下のとおりにプライバシーポリシーを定めます。</h1>
      <h1 className="mt-4 text-2xl font-bold">利用規約</h1>
      <p className="mt-2">
        この利用規約（以下，「本規約」といいます。）は，Seartist（以下，「当社」といいます。）がこのウェブサイト上で提供するサービス（以下，「本サービス」といいます。）の利用条件を定めるものです。登録ユーザーの皆さま（以下，「ユーザー」といいます。）には，本規約に従って，本サービスをご利用いただきます。
      </p>

      {/* 個人情報の利用目的 */}
      <h1 className="mt-4 text-2xl font-bold">個人情報の利用目的</h1>
      <div className="mt-2">
        <p>当アプリでは、新規登録の際に、名前（ハンドルネーム）、メールアドレス等の個人情報をご登録いただきます。</p>
        <p>
          これらの個人情報は（Seartist）を利用する場合に利用させていただくものであり、個人情報をご提供いただく際の目的以外では利用いたしません。
        </p>
      </div>

      {/* 個人情報の第三者への開示 */}
      <h1 className="mt-4 text-2xl font-bold">個人情報の第三者への開示</h1>
      <div className="mt-2">
        <p>当アプリでは、個人情報は適切に管理し、以下に該当する場合を除いて第三者に開示することはありません。</p>
        <p className="pl-4">・本人のご了解がある場合</p>
        <p className="pl-4">・法令等への協力のため、開示が必要となる場合</p>
      </div>

      {/* 個人情報の開示、訂正、追加、削除、利用停止 */}
      <h1 className="mt-4 text-2xl font-bold">個人情報の開示、訂正、追加、削除、利用停止</h1>
      <div className="mt-2">
        <p>
          ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
        </p>
      </div>

      {/* アクセス解析ツールについて */}
      <h1 className="mt-4 text-2xl font-bold">アクセス解析ツールについて</h1>
      <div className="mt-2">
        <p>当アプリでは、Googleによるアクセス解析ツール「Googleアナリティクス」を利用しています。</p>
        <p>
          このGoogleアナリティクスはトラフィックデータの収集のためにCookieを使用しています。このトラフィックデータは匿名で収集されており、個人を特定するものではありません。この機能はCookieを無効にすることで収集を拒否することが出来ますので、お使いのブラウザの設定をご確認ください。
        </p>
      </div>

      {/* 個人情報の開示、訂正、追加、削除、利用停止 */}
      <h1 className="mt-4 text-2xl font-bold">個人情報の開示、訂正、追加、削除、利用停止</h1>
      <div className="mt-2">
        <p>
          ご本人からの個人データの開示、訂正、追加、削除、利用停止のご希望の場合には、ご本人であることを確認させていただいた上、速やかに対応させていただきます。
        </p>
      </div>

      {/* 免責事項 */}
      <h1 className="mt-4 text-2xl font-bold">免責事項</h1>
      <div className="mt-2">
        <p>
          当アプリからリンクやバナーなどによって他のサイトに移動された場合、移動先サイトで提供される情報、サービス等について一切の責任を負いません。
        </p>
        <p>
          当アプリのコンテンツ・情報につきまして、可能な限り正確な情報を掲載するよう努めておりますが、誤情報が入り込んだり、情報が古くなっていることもございます。
        </p>
        <p>当アプリに掲載された内容によって生じた損害等の一切の責任を負いかねますのでご了承ください。</p>
      </div>

      {/* プライバシーポリシーの変更について */}
      <h1 className="mt-4 text-2xl font-bold">プライバシーポリシーの変更について</h1>
      <div className="mt-2">
        <p>
          当アプリは、個人情報に関して適用される日本の法令を遵守するとともに、本ポリシーの内容を適宜見直しその改善に努めます。
        </p>
        <p>修正された最新のプライバシーポリシーは常に本ページにて開示されます。</p>
      </div>

      {/* お問い合わせ */}
      <h1 className="mt-4 text-2xl font-bold">お問い合わせ</h1>
      <div className="mt-2">
        <p>ご不明な点やご質問等がございましたら、下記までお問い合わせください。</p>
        <p>
          <a href="https://twitter.com/watajamsan" target="_blank" rel="noopener noreferrer" className="text-blue-400">
            Twitter
          </a>
        </p>
      </div>

      <div className="mt-2">
        <p>初出掲載:令和4年1月13日</p>
        <p>最終更新日:令和4年1月13日</p>
      </div>
    </TermsOfUseAndPrivacyPolicyLayout>
  );
};

export default privacypolicy;
