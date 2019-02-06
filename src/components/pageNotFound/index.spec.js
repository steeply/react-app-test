/*eslint-disable */

import React from 'react';
import { shallow } from 'enzyme';
import PageNotFound from './index';

describe('PageNotFound container', () => {
  let container;
  beforeEach(() => {
    container = shallow(<PageNotFound />);
  });

  it('+++ render the PageNotFound component', () => {
    expect(container.length).toEqual(1);
  });

  it('+++ is render tag <h1>', () => {
    expect(container.find('h1').text()).toEqual('Error - 404');
  });

  it('+++ check Snapshot', () => {
    expect(container).toMatchSnapshot();
  });

});

/*eslint-enable */