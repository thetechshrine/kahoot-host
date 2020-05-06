import React, { useState } from 'react';
import PropTypes from 'prop-types';

import { v1 as uuid } from 'uuid';

import DropZone from '../../helpers/DropZone';
import AnswerInput from '../answers/AnswerInput';
import PropsModal from './PropsModal';

const timeLimits = [
  { key: uuid(), value: '5 sec' },
  { key: uuid(), value: '10 sec' },
  { key: uuid(), value: '20 sec' },
  { key: uuid(), value: '30 sec' },
  { key: uuid(), value: '60 sec' },
];

const points = [
  { key: uuid(), value: '500' },
  { key: uuid(), value: '1000' },
  { key: uuid(), value: '2000' },
];

const QuestionForm = ({ activeQuestion, onChange }) => {
  const dropZoneId = uuid();

  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [pointsModalVisible, setPointsModalVisible] = useState(false);

  return (
    <div className="question-form">
      <section className="title-container">
        <input
          name="title"
          type="text"
          className="title"
          placeholder="Click to start typing your question"
          onChange={(evt) => onChange(evt.target)}
          value={activeQuestion.title || ''}
        />
      </section>

      <section>
        <div className="props-container">
          <div className="time-points-container">
            <div className="prop-container">
              <p>Time limit</p>
              <button
                className="prop-button time"
                onClick={() => setTimeModalVisible(true)}
              >
                {activeQuestion.time} sec
              </button>
            </div>
            <div className="prop-container points">
              <p>Points</p>
              <button
                className="prop-button"
                onClick={() => setPointsModalVisible(true)}
              >
                {activeQuestion.points}
              </button>
            </div>
          </div>
          <div className="image-container">
            <DropZone
              id={dropZoneId}
              initValue={activeQuestion.file || activeQuestion.image}
              onFileChange={({ file, deleted }) =>
                onChange({ name: 'file', value: deleted ? null : file })
              }
            />
          </div>
          <div></div>
        </div>

        <div className="answers-container">
          <AnswerInput
            name="answer-1"
            type="two"
            placeHolder="Add answer 1"
            onChange={onChange}
            answer={
              activeQuestion.answers
                ? activeQuestion.answers.find((answer) => answer.position === 1)
                : {}
            }
          />
          <AnswerInput
            name="answer-2"
            type="one"
            placeHolder="Add answer 2"
            onChange={onChange}
            answer={
              activeQuestion.answers
                ? activeQuestion.answers.find((answer) => answer.position === 2)
                : {}
            }
          />
          <AnswerInput
            name="answer-3"
            type="three"
            placeHolder="Add answer 3 (optional)"
            onChange={onChange}
            answer={
              activeQuestion.answers
                ? activeQuestion.answers.find((answer) => answer.position === 3)
                : {}
            }
          />
          <AnswerInput
            name="answer-4"
            type="four"
            placeHolder="Add answer 4 (optional)"
            onChange={onChange}
            answer={
              activeQuestion.answers
                ? activeQuestion.answers.find((answer) => answer.position === 4)
                : {}
            }
          />
        </div>
      </section>

      <PropsModal
        show={timeModalVisible}
        onHide={() => setTimeModalVisible(false)}
        title="Time limit"
        choices={timeLimits}
        onDone={({ choice }) =>
          onChange({ name: 'time', value: Number(choice.value.split(' ')[0]) })
        }
      />

      <PropsModal
        show={pointsModalVisible}
        onHide={() => setPointsModalVisible(false)}
        title="Points"
        choices={points}
        onDone={({ choice }) =>
          onChange({ name: 'points', value: Number(choice.value) })
        }
      />
    </div>
  );
};

QuestionForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  activeQuestion: PropTypes.shape({
    title: PropTypes.string,
    time: PropTypes.number,
    points: PropTypes.number,
    file: PropTypes.shape({}),
    answers: PropTypes.arrayOf(
      PropTypes.shape({
        title: PropTypes.string,
        isCorrect: PropTypes.bool,
      })
    ),
  }),
};

export default QuestionForm;
