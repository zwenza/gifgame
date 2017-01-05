import React, { Component } from 'react';
import { Grid, Row, Col, FormControl, Button } from 'react-bootstrap';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as UserActions from '../../actions/user'
import { push } from 'react-router-redux';

import '../../styles/StartGame.css';

class StartGame extends Component {

  constructor() {
    super();
    this.state = {
      value: '',
    }
  }

  handleChange = (e) => {
    this.setState({value: e.target.value})
  }

  createUser = (e) => {
    e.preventDefault();
    this.props.actions.createUser(this.state.value);
    this.props.changeToLobby();
  }

  render() {
    return (
      <div className="start-game">
        <Grid>
          <Row>
            <Col md={6} mdOffset={3}>
              <h1>Enter your Gamer Tag</h1>
              <form className="start-game-form" onSubmit={this.createUser}>
                  <FormControl
                    type="text"
                    value={this.state.value}
                    placeholder="TheLegend27"
                    onChange={this.handleChange}
                  />
                  <Button bsStyle="primary" bsSize="large" onClick={this.createUser} block disabled={this.state.value === ''}>Play</Button>
              </form>
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(UserActions, dispatch),
  changeToLobby: () => dispatch(push('/lobby'))
});

export default connect(
  null,
  mapDispatchToProps
)(StartGame);
