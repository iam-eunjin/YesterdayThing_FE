import React, { useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import { BiHappyBeaming } from 'react-icons/bi';
import { TbMoodEmpty, TbMoodConfuzed, TbMoodCry, TbMoodHeart } from 'react-icons/tb';

// 현재 시간을 사람이 읽을 수 있는 포맷으로 변환하는 함수
const formatDate = date => {
  const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
  return new Date(date).toLocaleDateString('ko-KR', options);
};

const NewsDetail = () => {
  const { id } = useParams(); // URL에서 id를 가져옴
  const location = useLocation(); // 페이지 이동 시 전달된 state 접근
  const { articles } = location.state || { articles: [] }; // articles가 없을 경우 빈 배열 처리

  // URL에서 받은 id와 articles 배열이 올바른지 확인
  const articleIndex = parseInt(id, 10);
  const article = articles[articleIndex];

  // 댓글 상태 추가 (댓글과 작성 시간 함께 저장)
  const [comments, setComments] = useState([]); // 댓글 목록 상태
  const [newComment, setNewComment] = useState(''); // 새로운 댓글 입력 상태

  // 공감 상태 추가
  const [reactions, setReactions] = useState({
    재미있어요: 0,
    최고에요: 0,
    그저그래요: 0,
    별로에요: 0,
    슬퍼요: 0,
  });

  // id가 유효하지 않거나 articles가 없을 경우에 대한 처리
  if (!article) {
    return (
      <div className="container w-9/12 p-4 mx-auto">
        <div>해당 뉴스 정보를 불러올 수 없습니다. 관리자에게 문의하시거나 원문 기사로 이동해주세요.</div>
      </div>
    );
  }

  // 댓글 추가 함수
  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        text: newComment,
        timestamp: new Date(), // 현재 시간 저장
      };
      setComments([...comments, newCommentData]);
      setNewComment(''); // 댓글 추가 후 입력 필드 초기화
    }
  };

  // 공감 버튼 클릭 처리
  const handleReactionClick = reaction => {
    setReactions(prevReactions => ({
      ...prevReactions,
      [reaction]: prevReactions[reaction] + 1,
    }));
  };

  // 댓글 수를 계산하고 형식에 맞게 표시
  const commentCountText = comments.length === 1 ? '1개의 댓글' : `${comments.length}개의 댓글`;

  return (
    <div className="container w-9/12 p-4 mx-auto">
      <h1 className="mb-4 text-2xl font-bold">{article.title}</h1>
      {article.urlToImage && (
        <img src={article.urlToImage} alt={article.title} className="w-7/12 mx-auto my-8 rounded" />
      )}
      <p className="mb-4 text-gray-600">{article.description}</p>
      <div className="mt-4">{article.content}</div>
      <div className="mt-12">
        <a href={article.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
          원문 보기
        </a>
      </div>

      {/* 공감 섹션 */}
      <div className="mt-8">
        <h2 className="mb-4 text-xl font-bold">이 기사는 어떠셨나요?</h2>
        <div className="flex justify-between w-8/12 mx-auto space-x-4">
          <button onClick={() => handleReactionClick('재미있어요')} className="px-4 py-2 text-sm">
            <div className="w-10 h-10 mx-auto">
              <BiHappyBeaming size={40} />
            </div>
            <div>재미있어요</div>
            <div>{reactions['재미있어요']}</div>
          </button>
          <button onClick={() => handleReactionClick('최고에요')} className="px-4 py-2 text-sm">
            <div className="w-10 h-10 mx-auto">
              <TbMoodHeart size={40} />
            </div>
            <div> 최고에요</div>
            <div>{reactions['최고에요']}</div>
          </button>
          <button onClick={() => handleReactionClick('그저그래요')} className="px-4 py-2 text-sm ">
            <div className="w-10 h-10 mx-auto">
              <TbMoodEmpty size={40} />
            </div>
            <div>그저그래요</div>
            <div>{reactions['그저그래요']}</div>
          </button>
          <button onClick={() => handleReactionClick('별로에요')} className="px-4 py-2 text-sm">
            <div className="w-10 h-10 mx-auto">
              <TbMoodConfuzed size={40} />
            </div>
            <div>별로에요</div>
            <div>{reactions['별로에요']}</div>
          </button>
          <button onClick={() => handleReactionClick('슬퍼요')} className="px-4 py-2 text-sm">
            <div className="w-10 h-10 mx-auto">
              <TbMoodCry size={40} />
            </div>
            <div>슬퍼요</div>
            <div>{reactions['슬퍼요']}</div>
          </button>
        </div>
      </div>

      {/* 댓글 섹션 */}
      <div className="mt-16">
        <div className="flex items-center justify-between w-full mb-4 font-bold">
          <div className="text-xl">{commentCountText}</div>
          <button
            onClick={handleAddComment}
            className="px-4 py-2 text-sm text-white rounded-lg bg-blue-950 hover:bg-white hover:text-black hover:border-2">
            댓글 작성
          </button>
        </div>
        <div className="mb-6">
          <textarea
            value={newComment}
            onChange={e => setNewComment(e.target.value)}
            placeholder="댓글을 작성하려면 로그인해주세요."
            rows="4"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-950"></textarea>
        </div>
        <ul className="space-y-4">
          {comments.length > 0 ? (
            comments.map((comment, index) => (
              <li key={index} className="p-4 border-b rounded-lg">
                <div>{/* 작성자 */}</div>
                <div className="text-xs text-gray-400">{formatDate(comment.timestamp)}</div>
                <div>{comment.text}</div>
              </li>
            ))
          ) : (
            <li className="pl-2 text-gray-500">첫 번째 댓글을 남겨보세요.</li>
          )}
        </ul>
      </div>
    </div>
  );
};

export default NewsDetail;
