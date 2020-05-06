import React from 'react';
import PropTypes from 'prop-types';

const QuestionList = ({
  questions,
  onQuestionSelected,
  activeQuestion,
  onDelete,
}) => {
  const onDeletePressed = (question) => {
    if (questions.length > 1) {
      onDelete({ question });
    }
  };

  return (
    <ul className="question-list">
      {questions.map((question, index) => (
        <li
          className={question.uuid === activeQuestion.uuid ? 'active' : ''}
          key={question.uuid}
        >
          <div className="button-container">
            <button onClick={() => onDeletePressed(question)}>
              <span className="material-icons">delete_outline</span>
            </button>
          </div>
          <div
            className="question-box"
            onClick={() => onQuestionSelected({ question })}
          >
            {index + 1}
          </div>
        </li>
      ))}
    </ul>
  );
};

QuestionList.propTypes = {
  questions: PropTypes.arrayOf(
    PropTypes.shape({
      uuid: PropTypes.string,
      title: PropTypes.string,
      time: PropTypes.number,
      points: PropTypes.number,
      answers: PropTypes.arrayOf(
        PropTypes.shape({
          title: PropTypes.string,
          position: PropTypes.number,
          isCorrect: PropTypes.bool,
        })
      ),
    })
  ).isRequired,
  onQuestionSelected: PropTypes.func.isRequired,
  activeQuestion: PropTypes.shape({
    uuid: PropTypes.string,
  }),
  onDelete: PropTypes.func.isRequired,
};

export default QuestionList;
