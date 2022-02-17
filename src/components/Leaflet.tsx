import React from 'react';

function Leaflet() {
  return (
    <>
      <section className="leaflet">
        <div className="leaflet-container">
          <h1 className="logo">
            <i className="icon-logo"></i>
          </h1>
          <p className="slogan">
            <span className="sr-only">지루한 이동 시간을 힙하게</span>
            <img
              className="slogan1"
              src="/static/images/slogan1.svg"
              alt="지루한" />
            <img
              className="slogan2"
              src="/static/images/slogan2.svg"
              alt="이동시간을" />
            <span className="slogan-point">
              <img
                src="/static/images/slogan-point.svg"
                alt="힙"
                className="slogan-hip" />
              <img
                className="slogan3"
                src="/static/images/slogan3.svg"
                alt="하게" />
            </span>
          </p>
          <div className="lists">
            <ul className="promotion-list">
              <li className="promotion-item">
                <img src="/static/images/girl1.png" alt="사람 아이콘" />
                <div className="description">
                  <p className="question question1">
            &apos;지금 어디가?&apos;는 뭐하는 곳이야?
                  </p>
                  <p className="answer">
            이동하는데 불편함을 쓰는 곳이야!
                  </p>
                </div>
              </li>

              <li className="promotion-item">
                <img src="/static/images/girl2.png" alt="사람 아이콘" />
                <div className="description">
                  <p className="question question2">
            이동시간을 HIP하게? 어떻게?
                  </p>
                  <p className="answer">
            데일리빙고,교통상식 퀴즈를 즐겨봐!
                  </p>
                </div>
              </li>

              <li className="promotion-item">
                <img src="/static/images/girl3.png" alt="사람 아이콘" />
                <div className="description">
                  <p className="question question3">
                버스에서 물건을 잃어버렸어!
                  </p>
                  <p className="answer">
            우리가 물건을 찾을 수 있도록 도와줄게!
                  </p>
                </div>
              </li>
            </ul>
            <ul className="external-link-list">
              <a href="" className="external-link-item">
                <li>
                  <i className="icon-instagram" aria-label="인스타그램으로 이동"></i>
                </li>
              </a>
              <a href="" className="external-link-item">
                <li>
                  <i className="icon-facebook" aria-label="페이스북으로 이동"></i>
                </li>
              </a>
            </ul>
            <ul className="download-link-list">
              <li className="download-link-item">
                <a href="">
                  <img src="/static/images/google-play.png" alt="구글플레이로 이동" />
                </a>
              </li>
              <li className="download-link-item">
                <a href="">
                  <img src="/static/images/app-store.png" alt="구글플레이로 이동" />
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}

export default Leaflet;
