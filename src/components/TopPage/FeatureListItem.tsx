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
        <div className="flex flex-col items-center pt-24">
          <div className="inline-flex justify-center items-center mb-5 w-12 h-12 text-yellow-500 bg-yellow-100 rounded-full">
            {props.children}
          </div>
          <div className="grow text-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {props.title}
              <br /> <span className="text-xl">{props.subTitle}</span>
            </h1>
          </div>
        </div>
      </div>

      <div className="container flex flex-wrap justify-center py-24 px-5 mx-auto">
        <div className="overflow-hidden mb-10 w-5/6 rounded-xl md:w-1/2 xl:mb-0 xl:w-full xl:max-w-md">
          <img alt="feature" className="object-cover object-center w-full h-full" src={props.image} />
        </div>
        <div className="flex flex-col flex-wrap justify-center -mb-10 text-center xl:py-6 xl:pl-12 xl:w-1/2 xl:text-left">
          <div className="flex flex-col items-center mb-10">
            <div className="hidden justify-center items-center mb-5 w-12 h-12 text-yellow-500 bg-yellow-100 rounded-full sm:inline-flex">
              {props.children}
            </div>
            <div className="grow text-center">
              <h1 className="hidden mb-3 text-2xl font-bold text-gray-900 sm:block">
                {props.title}
                <br /> <span className="text-xl">{props.subTitle}</span>
              </h1>

              <p className="text-base leading-relaxed">{props.text}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(FeatureListItem);
