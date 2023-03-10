import { mount } from 'enzyme';
import * as React from 'react';
import { TableFilter } from './table-filter';
import { PeriodicContext } from '../periodic-table-state/periodic-selection-context';

describe('<TableFilter/>', () => {
  it('should be rendered', () => {
    const wrapper = renderElement();
    expect(wrapper.find('.mat-table-filter').length).toBe(1);
  });
  it('once a subselector is clicked, all others should be deselected', () => {
    const wrapper = renderElement();
    wrapper.find('.current-filter-selector').at(1).simulate('click');
    expect(wrapper.find('.current-filter-selector.selected').at(0).text()).toBe('Metals');
    expect(
      wrapper.find('.sub-filter-selector .current-filter-selector.selected').at(1).simulate('click')
    );
    expect(wrapper.find('.sub-filter-selector .current-filter-selector.selected').length).toBe(1);
  });

  xit('check callbacks', () => {});

  //TODO(chab) this is too close to the implementation, but it's mainly to close the coverage gap
  //TODO(chab) this would be better to be tested without context
  it('fitering on periods/groups does not use a mapping function', () => {
    const wrapper = renderElement();
    wrapper.find('.current-filter-selector').at(5).simulate('click');
    wrapper.find('.sub-filter-selector .current-filter-selector').at(1).simulate('click');

    // should expect a console.log statement
  });
});

function renderElement() {
  // we use mount to test the rendering of the underlying elements
  return mount(
    <PeriodicContext>
      <TableFilter />
    </PeriodicContext>
  );
}
