import React, {Component} from 'react'

import GameQuestionView from './GameQuestionView';
import GameAnswerView from './GameAnswerView';

class Game extends Component {
  render() {
    const view = true ? <GameQuestionView/> : <GameAnswerView/>
    return (
      <div className="game">
        {view}
      </div>
    )
  }
}

export default Game;
