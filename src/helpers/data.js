const throwError = (message) => {
  throw new Error(message);
};

const validateQuestions = async (questions) => {
  if (questions.length === 0) return;

  questions.forEach((question, index) => {
    const position = index + 1;
    if (!question.title) throwError(`Provide a title for question ${position}`);

    const submittedAnswers = question.answers.filter(
      (answer) => !!answer.title
    );
    if (submittedAnswers.length === 0)
      throwError(`You must submit a least 2 answers`);

    const correctAnswers = submittedAnswers.filter(
      (answer) => answer.isCorrect
    );
    if (correctAnswers.length === 0)
      throwError(`You must submit a least 1 valid answer`);
  });
};

const helper = {
  validateQuestions,
};

export default helper;
