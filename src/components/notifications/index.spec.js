/*eslint-disable */

import React from 'react';
import { shallow } from 'enzyme';
import configureStore from 'redux-mock-store';
import Notifications from './index';

describe('Notifications container', () => {
  const initialState = {
    notification: {
      title: 'title',
      message: 'text',
      type: 'info'
    }
  };
  const mockStore = configureStore();

  let store, container;

  beforeEach(() => {
    store = mockStore(initialState);
    container = shallow(<Notifications store={store} />);
  });

  it('+++ render the connected(Notifications) component', () => {
    expect(container.length).toEqual(1);
  });

  it('+++ check Snapshot', () => {
    expect(container).toMatchSnapshot();
  });

});

/*eslint-enable */