import React, { useEffect, useState } from 'react';

import BingoShare from '../components/BingoShare';

interface BingoItemProps {
  index: number,
  content: string
  isSelected: boolean;
}
function Bingo() {
  const initialBingoBoard: BingoItemProps[] = [
    {
      index: 1,
      content: '유선 이어폰 사용자 발견',
      isSelected: false,
    },
    {
      index: 2,
      content: '멋쟁이 노신사',
      isSelected: false,
    },
    {
      index: 3,
      content: '산책중인 멍멍이',
      isSelected: false,
    },
    {
      index: 4,
      content: '등교중인 어린이',
      isSelected: false,
    },
    {
      index: 5,
      content: '마스크 안 쓴 사람',
      isSelected: false,
    },
    {
      index: 6,
      content: '교복입은 학생',
      isSelected: false,
    },
    {
      index: 7,
      content: '경찰차 발견',
      isSelected: false,
    },
    {
      index: 8,
      content: '내가 좋아하는 편의점',
      isSelected: false,
    },
    {
      index: 9,
      content: '길가에 핀 꽃',
      isSelected: false,
    },
    {
      index: 10,
      content: '비행기 발견',
      isSelected: false,
    },
    {
      index: 11,
      content: '아직 녹지 않고 남은 눈',
      isSelected: false,
    },
    {
      index: 12,
      content: '공사중인 현장',
      isSelected: false,
    },
    {
      index: 13,
      content: '누군가 버린 쓰레기',
      isSelected: false,
    },
    {
      index: 14,
      content: '모자를 쓴 사람',
      isSelected: false,
    },
    {
      index: 15,
      content: '쉬고 있는 고양이',
      isSelected: false,
    },
    {
      index: 16,
      content: '길가에 핀 꽃',
      isSelected: false,
    },
  ];
  const [bingoBoard, setBingoBoard] =
    useState<BingoItemProps[]>(initialBingoBoard);
  const [bingoCount, setBingoCount] = useState(0);
  const bingoMatrix = [
    [...bingoBoard.map(({ isSelected }) => isSelected).slice(0, 4)],
    [...bingoBoard.map(({ isSelected }) => isSelected).slice(4, 8)],
    [...bingoBoard.map(({ isSelected }) => isSelected).slice(8, 12)],
    [...bingoBoard.map(({ isSelected }) => isSelected).slice(12, 16)],
  ];
  const [shareView, setShareView] = useState(false);

  // TODO: 나중에 서버에서 24시간마다 새 빙고판 가져오도록
  // useEffect(() => {
  // setBingoBoard();
  // }, [])

  const handleToggleBingo = (index: number) => {
    setBingoBoard(bingoBoard => (
      bingoBoard.map(
        item => (
          item.index === index
            ? { ...item, isSelected: !item.isSelected }
            : item
        )
      )));
  };

  const checkBingo = () => {
    let count = 0;
    // 가로
    bingoMatrix.forEach((row) => {
      if (row.reduce((acc, cur) => acc + Number(cur), 0) === 4) {
        count++;
      }
    });

    // 세로
    bingoMatrix.forEach((row, i) => {
      let bingo = true;
      row.forEach((_, j) => {
        bingo = bingo && bingoMatrix[j][i];
      });
      if (bingo) {
        count++;
      }
    });

    // 대각선
    let diagonalOne = true;
    let diagonalTwo = true;
    bingoMatrix.forEach((_, i) => {
      diagonalOne = diagonalOne && bingoMatrix[i][3 - i];
      diagonalTwo = diagonalTwo && bingoMatrix[i][i];
    });

    if (diagonalOne) {
      count++;
    }

    if (diagonalTwo) {
      count++;
    }

    setBingoCount(count);
  };

  const handleClickShare = () => {
    setShareView(view => !view);
  };

  useEffect(() => {
    checkBingo();
  }, [bingoBoard]);

  return (
    <div className="container">
      <div className="bingo">
        <div className="row">
          <div className="col-sm-4 bingo-info">
            <p>
                이동 중 마주친<br />
                일상 속 소소한 순간들을<br />
                빙고판에 남겨보세요
            </p>
          </div>
          <div className="col-sm-4">
            <div className="bingo-count">{bingoCount} 빙고!</div>
            <ul className="bingo-board">
              {bingoBoard.map(({ index, content, isSelected }) => (
                <li
                  key={index}
                  className={isSelected ? 'active' : ''}
                  onClick={() => handleToggleBingo(index)}
                >
                  <div>
                    {content}
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-sm-4">
            <button className="bingo-share_btn" onClick={handleClickShare}>
              내 빙고 공유하기
            </button>
          </div>
        </div>
        {shareView &&
        <div className="container">
          <div className="row">
            <div className="col-sm-4">
              <BingoShare
                onClickShare={handleClickShare}
                bingoBoard={bingoBoard}
                bingoCount={bingoCount}
              />
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  );
}

export default Bingo;
