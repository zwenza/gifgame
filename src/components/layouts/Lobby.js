import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';
import firebase from 'firebase';

import Spinner from '../Spinner';

import '../../styles/Lobby.css';

class Lobby extends Component {
  constructor(){
    super();
    this.state = {
      waitingUsers: [],
      otherPlayer: '',
      showModal: false
    };
  }

  componentDidMount(){
    var waitingRef = firebase.database().ref('waiting/');
    var self = this;
    waitingRef.on('value', function(snapshot) {
      self.setState({waitingUsers: Object.keys(snapshot.val()).map(obj => obj)});
    });
  }

  listPlayers = () => {
    const self = this;

    if (this.state.waitingUsers.length === 0) {
      return <Spinner />;
    }

    return this.state.waitingUsers.map((user, i) => <ListGroupItem key={i} onClick={() => self.selectPlayer(user)}>{user}</ListGroupItem>)
  }

  selectPlayer = (user) => {
    this.setState({otherPlayer: user});
    this.open();
  }

  createLobby = () => {
    console.log(`TODO create Lobby with ${this.state.otherPlayer}`);
    // TODO: go to lobby with player
  }

  // modal methods

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render(){

    const modal = (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Create Lobby with <strong>{this.state.otherPlayer}</strong></Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.createLobby}>Create Lobby</Button>
          <Button bsStyle="danger" onClick={this.close}>Cancel</Button>
        </Modal.Footer>

      </Modal>
    )

    return(
      <Row className='lobby' >
        <Col md={6} mdOffset={3}>
          <h1>Gamers in Lobby</h1>
          <ListGroup>
            { this.listPlayers() }
          </ListGroup>
        </Col>

        {modal}
      </Row>
    );
  }
}

export default Lobby;
