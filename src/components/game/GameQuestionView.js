import React, {Component} from 'react';
import { Grid, Row, Col, Button, FormControl} from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import Spinner from '../Spinner';

import * as GameActions from '../../actions/game'

import '../../styles/GameQuestionView.css'

class GameQuestionView extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
      words: []
    }
  }

  componentDidMount() {
    this.props.gameActions.getRandomGIF();
  }

  handleSubmit = (e) => {
    e.preventDefault();

    if(this.state.words.length < 5) {
      this.state.words.push(this.state.value);
      this.setState({value: ''});
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value});
  }

  render() {
    return (
      <div className="game-question">
        <Grid>
          <Row className="gif">
            <Col md={12}>
              {this.props.game.loading ? <Spinner/> : <img src={this.props.game.url} alt="Gif"/>}
            </Col>
          </Row>
          <Row className="words">
            <Col md={6} mdOffset={3}>
              <div className="words-wrapper">
                { this.state.words.map((word, i) =>  <span className="label label-primary" key={i}>{word}</span>) }
              </div>
            </Col>
          </Row>
          <Row className="input">
            <Col md={4}>
              <form onSubmit={this.handleSubmit}>
                <FormControl
                  type="text"
                  value={this.state.value}
                  placeholder="Add with Enter ..."
                  onChange={this.handleChange}
                  disabled={this.state.words.length >= 5}
                />
              </form>
            </Col>
            <Col md={1}>
              <div className="counter">
                {this.state.words.length} / 5
              </div>
            </Col>
          </Row>
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
)(GameQuestionView);
