import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationPage from '../notifications';

class App extends Component {
  render() {
    return (
      <div>
        <NotificationPage />
        {this.props.children}
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
