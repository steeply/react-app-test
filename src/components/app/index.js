import React, { Component } from 'react';
import PropTypes from 'prop-types';
import NotificationPage from '../notifications';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false
    };
  }

  static getDerivedStateFromError = () => {
    return { hasError: true };
  };

  componentDidCatch = (error, info) => {
    console.error('Error:', error, info);
    // this.props.loggerService({ error, info });
  };

  render() {
    if (this.state.hasError) {
      return <h1>
        <i style={{ color: 'red' }} class="fa fa-exclamation-triangle" aria-hidden="true"/>
        Опс... ошибочка...
      </h1>;
    }

    return (
      <React.Fragment>
        <NotificationPage />
        {this.props.children}
      </React.Fragment>
    );
  }
}

App.propTypes = {
  children: PropTypes.element.isRequired
};

export default App;
