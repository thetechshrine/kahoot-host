import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';

import queryString from 'query-string';

import gameActions from '../../store/actions/game';
import creatorActions from '../../store/actions/creator';

import Navbar from '../helpers/Navbar';
import Button from '../helpers/Button';
import DeleteModal from '../helpers/DeleteModal';
import QuestionForm from '../core/questions/QuestionForm';
import QuestionList from '../core/questions/QuestionList';

class Creator extends Component {
  state = {
    deleteModal: {
      visible: false,
      question: null,
    },
  };

  componentDidMount() {
    const query = queryString.parse(window.location.search);
    if (query && query.game) {
      const { getGame } = this.props;
      getGame(query.game);
    }
  }

  onClick = (evt) => {
    const { id } = evt.target;

    switch (id) {
      case 'add-question':
        this.props.addQuestion();
        break;
      default:
        break;
    }
  };

  onQuestionSelected = ({ question }) => {
    const { setActiveQuestion } = this.props;
    setActiveQuestion({ activeQuestion: question });
  };

  onChange = ({ name, value }) => {
    const update = {};
    if (name.includes('answer')) {
      const propName = name.split('-')[2];
      update.path = 'answers';
      update.value = {
        position: Number(name.split('-')[1]),
        [propName]: value,
      };
    } else {
      update.path = name;
      update.value = value;
    }

    this.props.updateActiveQuestion(update);
    if (name === 'file' && value === null) {
      this.props.updateActiveQuestion({
        path: 'image',
        value: '',
      });
    }
  };

  toggleDeleteModal = (question = null) => {
    this.setState({
      deleteModal: {
        visible: !this.state.deleteModal.visible,
        question,
      },
    });
  };

  onQuestionDelete = ({ question }) => {
    const { questions } = this.props;
    if (questions.length > 1) {
      this.toggleDeleteModal(question);
    }
  };

  processDeleteQuestion = () => {
    const { deleteModal } = this.state;
    this.props.deleteQuestion({ question: deleteModal.question });

    this.setState({
      deleteModal: {
        visible: false,
        question: null,
      },
    });
  };

  render() {
    const { deleteModal } = this.state;
    const { questions, activeQuestion, saving } = this.props;

    return (
      <div className="creator-container">
        <Navbar
          type="creator"
          doneButtonDisabled={saving}
          onDone={() => this.props.saveQuestions()}
        />
        <div className="creator">
          <section className="sidebar">
            <div className="inner-container">
              <QuestionList
                questions={questions}
                onQuestionSelected={this.onQuestionSelected}
                activeQuestion={activeQuestion}
                onDelete={this.onQuestionDelete}
              />
              <Button id="add-question" variant="one" onClick={this.onClick}>
                Add question
              </Button>
            </div>
          </section>
          <section className="main">
            <QuestionForm
              onChange={this.onChange}
              activeQuestion={activeQuestion}
            />
          </section>
        </div>
        <DeleteModal
          show={deleteModal.visible}
          onHide={this.toggleDeleteModal}
          onDone={this.processDeleteQuestion}
          title="Delete game question"
          message="Are you sure you want to delete this game question? This action can not be undone"
        />
      </div>
    );
  }
}

Creator.propTypes = {
  questions: PropTypes.arrayOf(PropTypes.shape({})),
  activeQuestion: PropTypes.shape({}),
  saving: PropTypes.bool,
  getGame: PropTypes.func.isRequired,
  setActiveQuestion: PropTypes.func.isRequired,
  updateActiveQuestion: PropTypes.func.isRequired,
  saveQuestions: PropTypes.func.isRequired,
  deleteQuestion: PropTypes.func.isRequired,
};

Creator.defaultProps = {
  questions: [],
  activeQuestion: {
    title: '',
    answers: [
      { title: null },
      { title: null },
      { title: null },
      { title: null },
    ],
  },
  saving: false,
};

const mapStateToProps = (state) => {
  return {
    questions: state.ui.creator.questions,
    activeQuestion: state.ui.creator.activeQuestion,
    saving: state.ui.creator.saving,
  };
};

const actions = {
  getGame: gameActions.getGame,
  setActiveQuestion: creatorActions.setActiveQuestion,
  updateActiveQuestion: creatorActions.updateActiveQuestion,
  addQuestion: creatorActions.addQuestion,
  saveQuestions: creatorActions.saveQuestions,
  deleteQuestion: creatorActions.deleteQuestion,
};

export default connect(mapStateToProps, actions)(Creator);
