import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap';

import '../../styles/StartGame.css';

class StartGame extends Component {

  constructor() {
    super();
    this.state = {
      value: ''
    }

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.setState({value: e.target.value})
  }

  render() {
    return (
      <div className="start-game">
        <Grid>
          <Row>
            <Col md={6} mdOffset={3}>
              <h1>Enter your Gamer Tag</h1>
              <form className="start-game-form">
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="TheLegend27"
                    onChange={this.handleChange}
                  />
                  <Button bsStyle="primary" bsSize="large" block>Play</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }

}

export default StartGame;
