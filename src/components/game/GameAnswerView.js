import React, {Component} from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Grid, Row, Col, Button, FormControl} from 'react-bootstrap';

import * as GameActions from '../../actions/game'

import '../../styles/GameAnswerView.css'

class GameAnswerView extends Component {

  constructor(props) {
    super(props);
    this.state = {
      value: '',
      words: ['scrubs', 'dr. cox', 'haha']
    }
  }

  componentDidMount(){
    this.props.gameActions.getRandomAnswerGIF();
  }

  componentWillReceiveProps(nextProps) {
    if(!nextProps.game.loading && nextProps.game.answerGifUrls.length < 3){
      nextProps.gameActions.getRandomAnswerGIF();
    }
  }

  render() {
    return (
      <div className="game-answer">
        <Grid>
          <Row className="words">
            <Col md={6} mdOffset={3}>
              <div className="words-wrapper">
                { this.state.words.map((word, i) =>  <span className="label label-primary" key={i}>{word}</span>) }
              </div>
            </Col>
          </Row>
          <div className="gifs">
          {
            this.props.game.answerGifUrls.map((url) => {
              return <img src={url} className="gif"/>
            })
          }
          </div>
        </Grid>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  game: state.game
});

const mapDispatchToProps = dispatch => ({
  gameActions: bindActionCreators(GameActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(GameAnswerView);
