import React from 'react';
import images from '../utils/importAll';

export default function Footer() {
  return (
    <div className="mt-12 bg-white">
      <div className="mx-auto mb-3 max-w-6xl border-t-[1px] border-gray-200 pt-8">
        <footer className="flex items-center justify-between">
          <div className="flex flex-col">
            <img className="mr-4 h-28 w-28" src={images['logo.png']} alt="logo img" />
            <div className="ml-4">
              <p className="fontRegular">서울특별시 강남구 선릉로 428</p>
              <p className="fontRegular">대표전화 : 1544-9001</p>
              <p className="fontRegular">www.yesterdaything.com</p>
              <p className="fontRegular">Copyright ⓒ 2024</p>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="mb-2 fontRegular">문의하기</p>
            <div className="flex justify-between w-full">
              <img className="w-5 h-5 mr-4" src={images['email.png']} alt="logo img" />
              <img className="w-5 h-5 mr-4" src={images['instagram.png']} alt="logo img" />
              <img className="w-5 h-5" src={images['twitter.png']} alt="logo img" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
