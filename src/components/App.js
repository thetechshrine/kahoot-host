import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { BrowserRouter } from 'react-router-dom';

import Button from './helpers/Button';
import Card from './helpers/Card';
import Modal from './helpers/Modal';
import Notification from './helpers/Notification';
import ImageButton from './helpers/ImageButton';
import Navbar from './helpers/Navbar';
import FormInput from './helpers/FormInput';

class App extends Component {
  state = {
    modalVisible: false,
  };

  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  render() {
    return (
      <BrowserRouter>
        <div className="App">
          <Navbar />

          <div className="container">
            <Button variant="one" onClick={this.toggleModal}>
              Click Me
            </Button>
            <div style={{ margin: '5rem' }}>
              <Card>
                <p style={{ padding: '2rem' }}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint,
                  enim.
                </p>
              </Card>

              <ImageButton type="one">
                <i className="fas fa-user"></i>
              </ImageButton>

              <FormInput type="text" label="Username" maxLength={10} />
              <FormInput type="password" label="Password" required />
              <FormInput type="number" label="Position" />
            </div>
          </div>

          {/* <Modal>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ipsam
          maiores iste reiciendis. Repudiandae beatae at voluptas, deleniti
          quidem ipsa quis!
        </Modal> */}

          <Notification
            show={this.state.modalVisible}
            onHide={this.toggleModal}
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium
            eum porro ad hic incidunt saepe nam sunt exercitationem vero
            doloribus, autem asperiores vitae illo tenetur dicta assumenda
            reprehenderit quo quisquam.
          </Notification>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
