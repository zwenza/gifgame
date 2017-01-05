import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem } from 'react-bootstrap';
import firebase from 'firebase';

class Lobby extends Component {
  constructor(){
    super();
    this.state = { waitingUsers: [] };
  }

  componentDidMount(){
    var waitingRef = firebase.database().ref('waiting/');
    var self = this;
    waitingRef.on('value', function(snapshot) {
      self.setState({waitingUsers: Object.keys(snapshot.val()).map(obj => obj)});
    });
  }

  render(){
    return(
      <Row>
        <Col md={6} mdOffset={3}>
          <h1>waiting users</h1>
          <ListGroup>
          { this.state.waitingUsers.map(user => <ListGroupItem>{user}</ListGroupItem>) }
          </ListGroup>
        </Col>
      </Row>
    );
  }
}

export default Lobby;
