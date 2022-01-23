import React, { memo, ReactNode, VFC } from 'react';

type Props = {
  bgColor?: string;
  title: string;
  subTitle?: string;
  text: string;
  image: string;
  children: ReactNode;
};

//機能一覧のリストアイテム
const FeatureListItem: VFC<Props> = (props) => {
  return (
    <section className={`text-gray-600 body-font ${props.bgColor}`}>
      <div className="sm:hidden ">
        <div className="flex flex-col   items-center pt-24">
          <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-5">
            {props.children}
          </div>
          <div className="flex-grow text-center">
            <h1 className="text-gray-900 text-2xl font-bold title-font ">
              {props.title}
              <br /> <span className="text-xl">{props.subTitle}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container px-5 py-24 mx-auto flex flex-wrap justify-center">
        <div className="mb-10 xl:mb-0 rounded-xl overflow-hidden xl:max-w-xl xl:w-full md:w-1/2 w-5/6">
          <img alt="feature" className="object-cover object-center h-full w-full" src={props.image} />
        </div>
        <div className="flex flex-col flex-wrap xl:py-6 -mb-10 xl:w-1/2 xl:pl-12 xl:text-left text-center justify-center">
          <div className="flex flex-col mb-10  items-center">
            <div className="w-12 h-12  items-center justify-center rounded-full bg-yellow-100 text-yellow-500 mb-5 hidden sm:inline-flex">
              {props.children}
            </div>
            <div className="flex-grow text-center">
              <h1 className="text-gray-900 text-2xl font-bold title-font  mb-3 hidden sm:block">
                {props.title}
                <br /> <span className="text-xl">{props.subTitle}</span>
              </h1>

              <p className="leading-relaxed text-base">{props.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(FeatureListItem);
