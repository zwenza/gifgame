import React, {Component} from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { push } from 'react-router-redux';

import GameQuestionView from './GameQuestionView';
import GameAnswerView from './GameAnswerView';
import firebase from 'firebase'

import * as GameActions from '../../actions/game'

class Game extends Component {
  render() {
    console.log(this.props);
    const view = this.props.user.name === this.props.game.currentGame.aktPlayer ? <GameQuestionView/> : <GameAnswerView/>
    return (
      <div className="game">
        {view}
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(GameActions, dispatch),
  redirectBack: () => dispatch(push('/'))
});

const mapStateToProps = state => ({
  user: state.user,
  game: state.game
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
