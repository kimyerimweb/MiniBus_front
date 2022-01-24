import React, { MouseEventHandler } from 'react';

interface BingoItemProps {
  index: number,
  content: string
  isSelected: boolean;
}
interface ShareProps {
  onClickShare: MouseEventHandler<HTMLButtonElement>
  bingoBoard: BingoItemProps[],
  bingoCount: number
}

function BingoShare({
  onClickShare, bingoBoard, bingoCount,
}: ShareProps) {
  return (
    <div className="bingo-share">
      <div className="container">
        <div className="row">
          <header className="col-sm-4 bingo-share-header">
            <h2>내 빙고 공유하기</h2>
            <button onClick={onClickShare}>
              <img src="/static/icons/cancel-black.svg" alt="공유 취소" />
            </button>
          </header>
          <section className="col-sm-4 bingo-share-contents">
            <h5>도전! 일상 빙고</h5>
            <div className="bingo-count">{bingoCount} 빙고!</div>
            <ul className="bingo-board">
              {bingoBoard.map(({ index, content, isSelected }) => (
                <li
                  key={index}
                  className={isSelected ? 'active' : ''}
                >
                  <div>
                    {content}
                  </div>
                </li>
              ))}
            </ul>
          </section>
          <footer className="col-sm-4">
            <ul className="bingo-share-social">
              <li>
                <img src="static/icons/icon-facebook.svg" alt="페이스북에 공유" />
              </li>
              <li>
                <img src="static/icons/icon-twitter.svg" alt="트위터에 공유" />
              </li>
              <li>
                <img src="static/icons/icon-kakaotalk.svg" alt="카카오톡에 공유" />
              </li>
              <li>
                <img src="static/icons/icon-link.svg" alt="링크 공유" />
              </li>
            </ul>
          </footer>
        </div>
      </div>
      <p>
        오늘 대중교통에서 겪은 일<br />
        공유하고 싶다면?
      </p>
    </div>
  );
}

export default BingoShare;
