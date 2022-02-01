import React, { memo, VFC } from 'react';

//topPageのフッター
const Footer: VFC = () => {
  return (
    <footer className="text-gray-600">
      <div className="container flex flex-col items-center py-8 px-5 mx-auto sm:flex-row">
        <a className="flex justify-center items-center font-medium text-gray-900 md:justify-start">
          <span className="ml-3 text-xl text-orange-400">Seartist</span>
        </a>
        <p className="mt-4 text-sm text-gray-500 sm:py-2 sm:pl-4 sm:mt-0 sm:ml-4 sm:border-l-2 sm:border-gray-200">
          © 2022 Seartist —
          <a
            href="https://twitter.com/watajamsan"
            className="ml-1 text-gray-600"
            rel="noopener noreferrer"
            target="_blank"
          >
            @watajamsan
          </a>
        </p>
      </div>
    </footer>
  );
};

export default memo(Footer);
