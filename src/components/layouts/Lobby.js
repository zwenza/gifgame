import React, { Component } from 'react';
import { Row, Col, ListGroup, ListGroupItem, Modal, Button } from 'react-bootstrap';
import firebase from 'firebase';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';
import { ConfirmModal, ActionModal } from '../Modal'

import * as UserActions from '../../actions/user'
import * as LobbyActions from '../../actions/lobby'
import * as GameActions from '../../actions/game'

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
      showDeclinedModal: false,
      loading: true
    };
  }

  componentDidMount(){
    // listen for player who are waiting for a game
    const waitingRef = firebase.database().ref('waiting/');
    waitingRef.on('value', (snapshot) => {
      if(snapshot.val() !== null){
        this.setState({waitingUsers: Object.keys(snapshot.val()).map(obj => obj), loading: false});
      }
    });

    // listen for a game invite
    const inviteRef = firebase.database().ref('invite/' + this.props.user.name);
    inviteRef.on('value', (snapshot) => {
      if(snapshot.val() !== null){
        // show the invite from the other player
        this.setState({
          showInvite: true,
          invitedBy: snapshot.val().by
        });

        // listen if game started after receiving the event
        const gameRef = firebase.database().ref('game/' + this.props.user.name + '_' + this.state.invitedBy);
        gameRef.on('value', (snapshot) => {
          if(snapshot.val() !== null){
            console.warn('found a game');
            // save the info who is the other player
            this.props.gameActions.setOpponent(this.state.invitedBy);
            // other user started game so start here too
            this.props.gameActions.loadGame(snapshot.val());
          }
        });
      }
    });
  }

  componentWillReceiveProps(nextProps){
    if(this.props.game.currentGame === undefined && nextProps.game.currentGame !== undefined){
      // game was created -> redirect in the game view
      this.props.redirectGame();
    }
  }

  listPlayers = () => {
    const self = this;

    if (this.state.loading) {
      return <Spinner />;
    }

    return this.state.waitingUsers.map((user, i) => <ListGroupItem key={i} onClick={() => self.selectPlayer(user)}>{user}</ListGroupItem>)
  }

  selectPlayer = (user) => {
    // show the dialog if the user wants to invite the player for a game
    this.setState({otherPlayer: user});
    this.open();
  }

  invitePlayer = () => {
    // invite player for a game
    this.props.lobbyActions.invitePlayer(this.state.otherPlayer);
    // close invite dialog
    this.close();

    // listen if user accepts the invite
    const acceptedRef = firebase.database().ref('accept/' + this.state.otherPlayer);
    acceptedRef.on('value', (snapshot) => {
      // remove the accept data after knowing that the user accepted
      firebase.database().ref('accept/' + this.state.otherPlayer).set(null);

      // user accepted game-invite
      if(snapshot.val() !== null){
        // start game
        this.props.gameActions.createGame(this.state.otherPlayer);
        this.props.gameActions.setOpponent(this.state.otherPlayer);
      }
    });

    // listen if user declined game invite
    const declinedRef = firebase.database().ref('decline/' + this.state.otherPlayer);
    declinedRef.on('value', (snapshot) => {
      // remove the decline data after knowing that the user declined
      firebase.database().ref('decline/' + this.state.otherPlayer).set(null);

      // user declined game-invite
      if(snapshot.val() !== null){
        // add the user to the lobby again
        this.props.userActions.createUser(this.props.user.name);
        // show dialog that user declined invite
        this.setState({
          showDeclinedModal: true
        });
      }
    });
  }

  declineInvite = () => {
    // decline game invite of other user
    this.props.lobbyActions.declineInvite();
    // enter the lobby again
    this.props.userActions.createUser(this.props.user.name);

    // reset the invite-dialog data
    this.setState({
      showInvite: false,
      invitedBy: ''
    });
  }

  acceptInvite = () => {
    // accept the invite from the user
    this.props.lobbyActions.acceptInvite();
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
    const DeclineInviteModal = ActionModal({
      title: <div>Game Request declined!!!! WTF??</div>,
      show: this.state.showDeclinedModal,
      action: this.closeDeclinedModal,
      actionLabel: 'Cancel'
    })

    const InviteModal = ConfirmModal({
      title: <div>Create Lobby with <strong>{this.state.otherPlayer}</strong></div>,
      show: this.state.showModal,
      cancel: this.close,
      cancelLabel: 'Cancel',
      confirm: this.invitePlayer,
      confirmLabel: 'Create Lobby'
    })

    const AcceptInviteModal = ConfirmModal({
      title: <div>Play against <strong>{this.state.invitedBy}</strong> ?</div>,
      show: this.state.showInvite,
      cancel: this.declineInvite,
      cancelLabel: 'Decline',
      confirm: this.acceptInvite,
      confirmLabel: 'Play'
    })

    return(
      <Row className='lobby' >
        <Col md={6} mdOffset={3}>
          <h1>Gamers in Lobby</h1>
          <ListGroup>
            { this.listPlayers() }
          </ListGroup>
        </Col>

        {InviteModal}
        {AcceptInviteModal}
        {DeclineInviteModal}
      </Row>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  userActions: bindActionCreators(UserActions, dispatch),
  lobbyActions: bindActionCreators(LobbyActions, dispatch),
  gameActions: bindActionCreators(GameActions, dispatch),
  redirectBack: () => dispatch(push('/')),
  redirectGame: () => dispatch(push('/game'))
});

const mapStateToProps = state => ({
  user: state.user,
  game: state.game
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Lobby);
