import { mount } from 'enzyme';
import { Table, TableLayout } from './periodic-table.component';
import * as React from 'react';

const enabled = { H: true, Li: true };

describe('<Table/>', () => {
  it('should be rendered', () => {
    const wrapper = renderElement(enabled, { ...enabled });
    expect(wrapper.find('.table-container').length).toBe(1);
    expect(wrapper.find('.mat-element').length).toBe(120);
  });
  it('should have correct enabled state', () => {
    const wrapper = renderElement({}, enabled);
    expect(wrapper.find('.mat-element').at(0).hasClass('enabled')).toBe(true);
    expect(wrapper.find('.mat-element').at(1).hasClass('enabled')).toBe(false);
    expect(wrapper.find('.mat-element').at(2).hasClass('enabled')).toBe(true);
  });
  it('should have correct disabled state', () => {
    const wrapper = renderElement({ ...enabled });
    expect(wrapper.find('.mat-element').at(0).hasClass('disabled')).toBe(true);
    expect(wrapper.find('.mat-element').at(1).hasClass('enabled')).toBe(false);
    expect(wrapper.find('.mat-element').at(2).hasClass('disabled')).toBe(true);
  });
  it('should have correct hidden state', () => {
    const wrapper = renderElement({}, {}, { ...enabled });
    expect(wrapper.find('.mat-element').at(0).hasClass('hidden')).toBe(true);
    expect(wrapper.find('.mat-element').at(1).hasClass('hidden')).toBe(false);
    expect(wrapper.find('.mat-element').at(2).hasClass('hidden')).toBe(true);
  });

  // it('click callback should be called', () => {
  //   const click = jest.fn();
  //   const hover = jest.fn();
  //   const wrapper = renderElement({}, {}, { ...enabled }, click, hover);
  //   expect(
  //     wrapper
  //       .find('.mat-element')
  //       .at(0)
  //       .simulate('click')
  //   );
  //   expect(click).toHaveBeenCalled();
  //   expect(hover).toHaveBeenCalledTimes(0);
  // });

  it('hover callback should be called', () => {
    const click = jest.fn();
    const hover = jest.fn();
    const wrapper = renderElement({}, {}, { ...enabled }, click, hover);
    expect(wrapper.find('.mat-element').at(0).simulate('mouseover'));
    expect(hover).toHaveBeenCalled();
    expect(click).toHaveBeenCalledTimes(0);
  });
});

export function renderElement(
  disabled = {},
  enabled = {},
  hidden = {},
  onClick = () => {},
  onHover = () => {},
  heatmap = {},
  min?: string,
  max?: string
) {
  // we use mount to test the rendering of the underlying elements
  return mount(
    <Table
      enabledElement={enabled}
      disabledElement={disabled}
      onElementMouseOver={onHover}
      forceTableLayout={TableLayout.SPACED}
      hiddenElement={hidden}
      heatmap={heatmap}
      heatmapMin={min}
      heatmapMax={max}
      showSwitcher={true}
      onElementClicked={onClick}
    />
  );
}
