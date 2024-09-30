import React, { useEffect, useState } from 'react';
import images from '../utils/importAll';
import { Dialog, DialogPanel } from '@headlessui/react';
import NewsSwitcher from './NewsSwitcher';

const navigation = [
  { name: '사회', us: 'general', kr: ['politics', 'society'] },
  { name: '경제', us: 'business', kr: 'economy' },
  { name: '생활/문화', us: 'entertainment', kr: 'entertainment' },
  { name: '기술', us: 'technology', kr: 'tech' },
];

export default function Nav({ item, setItem, category, setCategory }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const storedItem = localStorage.getItem('item');
    if (storedItem) {
      setItem(storedItem);
    }
  }, [setItem]);

  const toggleItem = () => {
    const newItem = item === '국내' ? '해외' : '국내';
    localStorage.setItem('item', newItem);
    setItem(newItem);
  };

  const handleClick = category => {
    setCategory(category);
  };

  return (
    <div className="w-10/12 mx-auto bg-white">
      <header className="max-w-full px-4 mx-auto mt-2">
        <nav className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <a href="/" className="-m-1.5 p-1.5">
              <img className="w-24 h-24 mr-4" src={images['logo.png']} alt="logo img" />
            </a>
            {/*토글 동그라미에 가려지는 글자와 동적 효과*/}
            <div
              className="w-[90px] h-[36px] bg-indigo-900 px-2 rounded-full relative flex items-center overflow-hidden ease-in-out duration-200 cursor-pointer"
              onClick={toggleItem}>
              <div
                className={`absolute top-1 left-1 w-7 h-7 bg-white rounded-full transition-transform duration-500 ease-in-out z-10 ${
                  item === '해외' ? 'translate-x-[55px]' : ''
                }`}
              />
              <div className="relative z-0 flex justify-between w-full md:text-sm fontSB">
                <p
                  className={`text-white transition-opacity duration-700 ml-2 ${
                    item === '국내' ? 'opacity-0' : 'opacity-100'
                  }`}>
                  국내
                </p>
                <p
                  className={`text-white transition-opacity duration-700 mr-2 ${
                    item === '해외' ? 'opacity-0' : 'opacity-100'
                  }`}>
                  해외
                </p>
              </div>
            </div>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
          <div className="justify-center flex-1 hidden lg:flex gap-x-20">
            {navigation.map(item => (
              <button
                key={item.name}
                onClick={() => handleClick(item.us)}
                className="text-base leading-6 text-gray-900 transition-all duration-300 fontBold hover:text-indigo-800">
                {item.name}
              </button>
            ))}
          </div>
          <div className="hidden lg:flex lg:justify-end">
          <button>
            <img className="w-9" src={images['web_light_rd_na@3x.png']} alt="login img" />
          </button>
          </div>
        </nav>
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full px-6 py-3 overflow-y-auto bg-white sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
            <div className="flex items-center justify-between">
              <img alt="logo img" src={images['logo.png']} className="w-24 h-24" />
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-700">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6">
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="flow-root mt-6">
              <div className="-my-6 divide-y divide-gray-500/10">
                <div className="py-6 space-y-2">
                  {navigation.map(item => (
                    <button
                      key={item.name}
                      onClick={() => handleClick(item.us)}
                      className="block w-full px-3 py-2 -mx-3 text-base leading-7 text-left text-gray-900 rounded-lg fontBold hover:bg-indigo-900 hover:text-white">
                      {item.name}
                    </button>
                  ))}
                </div>
                <div className="py-6">
                  <button
                    className="block w-full px-3 py-2 -mx-3 text-base leading-7 text-left text-gray-900 rounded-lg fontBold hover:bg-indigo-900 hover:text-white">
                    <img className="w-9" src={images['web_light_rd_na@3x.png']} alt="login img" />
                  </button>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>
    </div>
  );
}
