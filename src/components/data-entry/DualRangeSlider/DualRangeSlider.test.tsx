import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { render, fireEvent, waitFor, screen, cleanup } from '@testing-library/react';
import { DualRangeSlider } from '.';

afterEach(() => cleanup());

const renderElement = ({
  domain = [0, 25],
  valueMin = 5,
  valueMax = 10,
  step = 1,
  onChange = () => undefined,
  onPropsChange = () => undefined
}) => {
  render(
    <DualRangeSlider
      domain={domain}
      valueMin={valueMin}
      valueMax={valueMax}
      step={step}
      onChange={onChange}
      onPropsChange={onPropsChange}
    />
  );
};

describe('<DualRangeSlider/>', () => {
  it('should render with correct values', () => {
    renderElement({
      domain: [-100, 100],
      valueMin: -20,
      valueMax: 50
    });
    expect(screen.getByTestId('lower-bound-input')).toHaveValue(-20);
    expect(screen.getByTestId('upper-bound-input')).toHaveValue(50);
    expect(screen.getAllByTestId('slider-button')[0]).toHaveAttribute('aria-valuenow', '-20');
    expect(screen.getAllByTestId('slider-button')[1]).toHaveAttribute('aria-valuenow', '50');
  });

  it('should change slider values when input changes', async () => {
    renderElement({
      domain: [-100, 100],
      valueMin: -20,
      valueMax: 50
    });
    fireEvent.change(screen.getByTestId('lower-bound-input'), { target: { value: 9 } });
    await waitFor(() => {
      expect(screen.getByTestId('lower-bound-input')).toHaveValue(9);
      expect(screen.getAllByTestId('slider-button')[0]).toHaveAttribute('aria-valuenow', '9');
    });
  });

  it('should prevent values outside of domain', async () => {
    renderElement({
      domain: [-100, 100],
      valueMin: -20,
      valueMax: 50
    });
    fireEvent.change(screen.getByTestId('lower-bound-input'), { target: { value: -111 } });
    await waitFor(() => {
      expect(screen.getByTestId('lower-bound-input')).toHaveValue(-100);
      expect(screen.getAllByTestId('slider-button')[0]).toHaveAttribute('aria-valuenow', '-100');
    });
    fireEvent.change(screen.getByTestId('lower-bound-input'), { target: { value: 70 } });
    await waitFor(() => {
      expect(screen.getByTestId('lower-bound-input')).toHaveValue(70);
      expect(screen.getByTestId('upper-bound-input')).toHaveValue(70);
      expect(screen.getAllByTestId('slider-button')[0]).toHaveAttribute('aria-valuenow', '70');
      expect(screen.getAllByTestId('slider-button')[1]).toHaveAttribute('aria-valuenow', '70');
    });
  });

  it('should use nice domain values', async () => {
    renderElement({
      domain: [-97, 88]
    });
    expect(screen.getAllByTestId('tick-value')[0]).toHaveTextContent('-100');
    expect(screen.getAllByTestId('tick-value')[4]).toHaveTextContent('100');
  });
});
