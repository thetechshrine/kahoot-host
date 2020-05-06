import _ from 'lodash';

import httpClient from '../../api/http-client';

const toFormData = (question) => {
  const formData = new FormData();
  Object.keys(question).forEach((key) => {
    if (key === 'answers') {
      question[key].forEach((answer, index) => {
        formData.append(`${key}[]`, JSON.stringify(answer));
      });
    } else if (key === 'file') {
      if (question[key]) {
        formData.append('image', question[key]);
        formData.append('folder', 'questions');
      }
    } else {
      formData.append(key, question[key]);
    }
  });

  return formData;
};

const createQuestion = (gameId, question) => {
  const formData = toFormData(question);

  const configs = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return httpClient.post(`/games/${gameId}/questions`, formData, configs);
};

const updateQuestion = (gameId, questionId, updates) => {
  const formData = toFormData(updates);

  const configs = {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  };

  return httpClient.put(
    `/games/${gameId}/questions/${questionId}`,
    formData,
    configs
  );
};

const saveQuestions = async ({
  gameId,
  creatorQuestions = [],
  gameQuestions = [],
}) => {
  const questions = [];
  const createTasks = [];
  const updateTasks = [];

  if (creatorQuestions.length === 0) return;
  if (gameQuestions.length === 0) {
    creatorQuestions.forEach((question) => {
      createTasks.push(createQuestion(gameId, question));
    });
  } else {
    creatorQuestions.forEach((creatorQuestion) => {
      const foundQuestion = gameQuestions.find(
        (gameQuestion) => gameQuestion.uuid === creatorQuestion.uuid
      );
      if (foundQuestion) {
        if (!_.isEqual(foundQuestion, creatorQuestion)) {
          const { _id, ...updates } = creatorQuestion;
          updateTasks.push(updateQuestion(gameId, _id, updates));
        }
      } else {
        createTasks.push(createQuestion(gameId, creatorQuestion));
      }
    });
  }

  if (createTasks.length > 0) {
    const createResponse = await Promise.all(createTasks);
    questions.push(...createResponse.map((response) => response.data));
  }
  if (updateTasks.length > 0) {
    const updatedResponse = await Promise.all(updateTasks);
    questions.push(...updatedResponse.map((response) => response.data));
  }

  return questions;
};

const deleteQuestion = (gameId, questionId) => {
  return httpClient.delete(`/games/${gameId}/questions/${questionId}`);
};

const service = {
  saveQuestions,
  deleteQuestion,
};

export default service;
