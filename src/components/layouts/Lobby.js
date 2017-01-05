import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';
import firebase from 'firebase';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/user'
import { push } from 'react-router-redux';

import Spinner from '../Spinner';

import '../../styles/Lobby.css';

class Lobby extends Component {
  constructor(props){
    super(props);
    this.state = {
      waitingUsers: [],
      otherPlayer: '',
      showModal: false,
      showInvite: false,
      invitedBy: '',
      showDeclinedModal: false
    };
  }

  componentDidMount(){
    var waitingRef = firebase.database().ref('waiting/');
    waitingRef.on('value', (snapshot) => {
      this.setState({waitingUsers: Object.keys(snapshot.val()).map(obj => obj)});
    });

    const inviteRef = firebase.database().ref('invite/' + this.props.user.name);
    inviteRef.on('value', function(snapshot) {
      if(snapshot.val() !== null){
        self.setState({
          showInvite: true,
          invitedBy: snapshot.val().by
        });
      }
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

  invitePlayer = () => {
    this.props.actions.invitePlayer(this.state.otherPlayer);
    this.close();

    const acceptedRef = firebase.database().ref('accept/' + this.state.otherPlayer);
    acceptedRef.on('value', (snapshot) => {
      firebase.database().ref('accept/' + this.state.otherPlayer).set(null);

      //start game
      if(snapshot.val() !== null){
        alert('accepted!');
      }
    });

    const declinedRef = firebase.database().ref('decline/' + this.state.otherPlayer);
    declinedRef.on('value', (snapshot) => {
      firebase.database().ref('decline/' + this.state.otherPlayer).set(null);

      if(snapshot.val() !== null){
        this.props.actions.createUser(this.props.user.name);
        this.setState({
          showDeclinedModal: true
        });
      }
    });
  }

  declineInvite = () => {
    this.props.actions.declineInvite();
    this.props.actions.createUser(this.props.user.name);

    this.setState({
      showInvite: false,
      invitedBy: ''
    });
  }

  acceptInvite = () => {
    this.props.actions.acceptInvite();
  }

  // modal methods
  closeDeclinedModal = () => {
    this.setState({ showDeclinedModal: false });
  }

  close = () => {
    this.setState({ showModal: false });
  }

  open = () => {
    this.setState({ showModal: true });
  }

  render(){
    const declinedModal = (
      <Modal show={this.state.showDeclinedModal}>
        <Modal.Header closeButton>
          <Modal.Title>Game Request declined!!!! WTF??</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button bsStyle="danger" onClick={this.closeDeclinedModal}>Cancel</Button>
        </Modal.Footer>

      </Modal>
    )

    const modal = (
      <Modal show={this.state.showModal} onHide={this.close}>
        <Modal.Header closeButton>
          <Modal.Title>Create Lobby with <strong>{this.state.otherPlayer}</strong></Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.invitePlayer}>Create Lobby</Button>
          <Button bsStyle="danger" onClick={this.close}>Cancel</Button>
        </Modal.Footer>

      </Modal>
    )

    const acceptModal = (
      <Modal show={this.state.showInvite} onHide={this.declineInvite}>
        <Modal.Header closeButton>
          <Modal.Title>Play against <strong>{this.state.invitedBy}</strong> ?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <Button bsStyle="primary" onClick={this.acceptInvite}>Play</Button>
          <Button bsStyle="danger" onClick={this.declineInvite}>Decline</Button>
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
        {acceptModal}
        {declinedModal}
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch),
  redirectBack: () => dispatch(push('/'))
});

const mapStateToProps = state => ({
  user: state.user
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
