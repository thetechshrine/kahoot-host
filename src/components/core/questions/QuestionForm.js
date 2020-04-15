import React, { useState } from 'react';

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
  { key: uuid(), value: '0' },
  { key: uuid(), value: '1000' },
  { key: uuid(), value: '2000' },
];

const QuestionForm = () => {
  const dropZoneId = uuid();

  const [timeModalVisible, setTimeModalVisible] = useState(false);
  const [pointsModalVisible, setPointsModalVisible] = useState(false);

  return (
    <div className="question-form">
      <section className="title-container">
        <input
          type="text"
          className="title"
          placeholder="Click to start typing your question"
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
                10 sec
              </button>
            </div>
            <div className="prop-container points">
              <p>Points</p>
              <button
                className="prop-button"
                onClick={() => setPointsModalVisible(true)}
              >
                1000
              </button>
            </div>
          </div>
          <div className="image-container">
            <DropZone id={dropZoneId} />
          </div>
          <div></div>
        </div>

        <div className="answers-container">
          <AnswerInput type="two" placeHolder="Add answer 1" />
          <AnswerInput type="one" placeHolder="Add answer 2" />
          <AnswerInput type="three" placeHolder="Add answer 3 (optional)" />
          <AnswerInput type="four" placeHolder="Add answer 4 (optional)" />
        </div>
      </section>

      <PropsModal
        show={timeModalVisible}
        onHide={() => setTimeModalVisible(false)}
        title="Time limit"
        choices={timeLimits}
        onDone={({ choice }) => console.log(choice)}
      />

      <PropsModal
        show={pointsModalVisible}
        onHide={() => setPointsModalVisible(false)}
        title="Points"
        choices={points}
        onDone={({ choice }) => console.log(choice)}
      />
    </div>
  );
};

export default QuestionForm;
