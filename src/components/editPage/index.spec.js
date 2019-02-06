/*eslint-disable */

import React from 'react';
import { shallow } from 'enzyme';
import thunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import ConnectedEditPage from './index';

describe('ConnectedEditPage container', () => {
  const initialState = {
    models: {
      list: [
        { id: 1, modelName: 'name', properties: [] }
      ],
      isLoading: false
    }
  };

  const nextProps = {
    match: {
      params: {
        id: '1'
      }
    }
  };

  const mockStore = configureStore([thunk]);
  let store, wrapper;

  beforeEach(() => {
    store = mockStore(initialState);
    wrapper = shallow(<ConnectedEditPage {...nextProps} store={store} />);
  });

  it('+++ check Snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });

  it('+++ render the connected(EditPage) component', () => {
    expect(wrapper.length).toEqual(1);
  });

  it('+++ check Prop matches with initialState', () => {
    expect(wrapper.prop('modelsList')).toEqual(initialState.models.list);
  });

  it('+++ is render tag <h1>', () => {
    const component = wrapper.dive();
    expect(component.find('h1').text()).toEqual('Редактирование модели (id: 1)');
  });

  it('checks componentDidMount is called', () => {
    const spy = jest.spyOn(ConnectedEditPage.prototype, 'componentDidMount');
    shallow(<ConnectedEditPage store={store} />);
    expect(spy).toHaveBeenCalled();
    ConnectedEditPage.prototype.componentDidMount.mockRestore();
  });

});

/*eslint-enable */