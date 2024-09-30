import React from 'react';
import TopUs from './TopUs';
import TopKr from './TopKr';

export default function NewsSwitcher({ item, currentCategory }) {
  return (
    <div className="mb-5">
      {item === '국내' ? <TopUs category={currentCategory.us} /> : <TopKr category={currentCategory.kr} />}
    </div>
  );
}
