import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { DualRangeSlider } from '../../components/data-entry/DualRangeSlider';
import { DualRangeSliderProps } from '../../components/data-entry/DualRangeSlider/DualRangeSlider';

export default {
  component: DualRangeSlider,
  title: 'Data-Entry/DualRangeSlider'
};

const Template: Story<React.PropsWithChildren<DualRangeSliderProps>> = (args) => (
  <DualRangeSlider {...args} />
);

export const Basic = Template.bind({});
Basic.args = {
  domain: [0, 100],
  step: 1,
  value: [10, 50]
};

export const WithoutDebounce = Template.bind({});
WithoutDebounce.args = {
  ...Basic.args,
  debounce: 0
};

export const WithMoreTicks = Template.bind({});
WithMoreTicks.args = {
  ...Basic.args,
  ticks: 10
};
