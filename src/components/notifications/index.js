import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import * as NotificationActions from '../../actions/notification';


class Notification extends Component {

  componentDidUpdate = () => {
    const { type, message, title } = this.props;
    if (type && message && title) {
      NotificationManager[type](message, title);
    }
  };

  shouldComponentUpdate = (nextProps) => {
    const { clearNotification, type } = nextProps;
    if (type === 'clear') return false;
    clearNotification();
    return true;
  };

  render() {
    return <NotificationContainer />;
  }
}

Notification.propTypes = {
  clearNotification: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['info', 'success', 'warning', 'error', 'clear']).isRequired
};


function mapStateToProps(state) {
  return {
    title: state.notification.title,
    message: state.notification.message,
    type: state.notification.type
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(NotificationActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Notification);
