import React, { Component } from 'react';

import Navbar from '../helpers/Navbar';
import Button from '../helpers/Button';
import QuestionForm from '../core/questions/QuestionForm';
import QuestionList from '../core/questions/QuestionList';

class Creator extends Component {
  render() {
    return (
      <>
        <Navbar type="creator" />
        <div className="creator">
          <section className="sidebar">
            <div className="inner-container">
              <QuestionList />
              <Button variant="one">Add question</Button>
            </div>
          </section>
          <section className="main">
            <QuestionForm />
          </section>
        </div>
      </>
    );
  }
}

export default Creator;
