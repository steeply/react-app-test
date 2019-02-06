/*eslint-disable */

import React from 'react';
import { shallow, mount } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ConnectedHome from './index';

describe('Home container initial', () => {
  const initialState = {
    models: {
      list: [],
      isLoading: false
    }
  };
  const mockStore = configureStore([thunk]);
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedHome store={store} />);
  });

  it('+++ check Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ render the connected(Home) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ check Prop matches with initialState', () => {
    expect(wrapper.prop('modelsList')).toEqual(initialState.models.list);
  });

  it('+++ is render tag <h1>', () => {
    const component = wrapper.dive();
    expect(component.find('h1').text()).toEqual('Список моделей');
  });

  it('checks componentDidMount is called', () => {
    const spy = jest.spyOn(ConnectedHome.prototype, 'componentDidMount');
    shallow(<ConnectedHome store={store} />);
    expect(spy).toHaveBeenCalled();
    ConnectedHome.prototype.componentDidMount.mockRestore();
  });

});

/*eslint-enable */