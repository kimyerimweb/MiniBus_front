import React from 'react';
import { useNavigate } from 'react-router';

import { reportCommentApi, reportPostApi } from '../apis/report';
import ReportInput from '../components/ReportInput';
import useInput from '../hooks/useInput';
import { getParamId, getRequestedPage } from '../utils/location';

function Report () {
  const id = getParamId();
  const requestedPage = getRequestedPage();

  const navigate = useNavigate();
  const [
    selectedReportReason,
    handleChangeSelectedReportReason,
  ] = useInput('');
  const [detailReason, handleChangeDetailReason] = useInput('');

  const handleSubmitReport = async(e:React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();

    let response = '';

    if (requestedPage === 'post') {
      response = await reportPostApi({
        id,
        reportReason: selectedReportReason,
        detail: detailReason,
      });
    }

    if (requestedPage === 'comment') {
      response = await reportCommentApi({
        id,
        reportReason: selectedReportReason,
        detail: detailReason,
      });
    }

    if (response) {
      alert('신고가 접수되었습니다!');
      navigate(-1);
      return;
    }

    alert('다시 시도해주세요');
  };

  return (
    <section className="report">
      <div className="container">
        <div className="row">
          <div className="col-sm-4">
            <header className="report_header">
              <h2>신고하기</h2>
              <button onClick={() => { navigate(-1); }}>
                <i className="icon-cancel" aria-label="신고창 닫기"></i>
              </button>
            </header>
          </div>
        </div>

        <div className="report_body">
          <form onSubmit={handleSubmitReport}>
            <ReportInput
              selectedReportReason={selectedReportReason}
              handleChangeSelectedReportReason=
                {handleChangeSelectedReportReason}
              handleChangeDetailReason={handleChangeDetailReason}
            />
            <div className="row">
              <div className="col-sm-4">
                <button
                  type="submit"
                  className="submit_btn"
                  disabled=
                    {
                      !selectedReportReason ||
                    (selectedReportReason === '기타' && !detailReason)
                    }
                >
                  신고하기
                </button>
              </div>
            </div>
          </form>
          <div className="row">
            <div className="col-sm-4">
              <p className="report-notice">
                *신고사유에 대한 해당 여부 검토 후 처리되며 허위 신고인 경우 서비스 이용에 제한 될수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Report;
