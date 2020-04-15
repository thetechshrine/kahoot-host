import React from 'react';

const QuestionList = ({ questions }) => {
  return (
    <ul className="question-list">
      <li>
        <div className="button-container">
          <button>
            <span className="material-icons">delete_outline</span>
          </button>
        </div>
        <div className="question-box">1</div>
      </li>

      <li className="active">
        <div className="button-container">
          <button>
            <span className="material-icons">delete_outline</span>
          </button>
        </div>
        <div className="question-box">1</div>
      </li>
    </ul>
  );
};

export default QuestionList;
