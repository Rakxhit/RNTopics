import React from 'react';
import {fireEvent, render} from '@testing-library/react-native';
import OnboardItem from '../../../src/components/global/OnboardItem';
jest.mock('react-native-linear-gradient', () => 'LinearGradient');

describe('Onboarding item', () => {
  const mockOnPressFirst = jest.fn();
  const mockOnPressSecond = jest.fn();
  const imageSource = {uri: 'https://gif.png'};
  const title = 'Test title';
  const subTitle = 'Test Subtitle';
  const buttonTitleFirst = 'First Button';
  const buttonTitleSecond = 'Second Button';

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(
      <OnboardItem
        buttonTitleFirst={buttonTitleFirst}
        imageSource={imageSource}
        onPressFirst={mockOnPressFirst}
        subtitle={subTitle}
        title={title}
        buttonTitleSecond={buttonTitleSecond}
        onPressSecond={mockOnPressSecond}
      />,
    );
    expect(toJSON()).toMatchSnapshot();
  });

  it('should render correctly with one button', () => {
    const {getByText, getByTestId} = render(
      <OnboardItem
        title={title}
        subtitle={subTitle}
        buttonTitleFirst={buttonTitleFirst}
        imageSource={imageSource}
        onPressFirst={mockOnPressFirst}
      />,
    );
    expect(getByText(title)).toBeTruthy();
    expect(getByText(subTitle)).toBeTruthy();
    expect(getByTestId('background-image')).toBeTruthy();
    expect(getByTestId('first-button-alone')).toBeTruthy();
    const button = getByTestId('first-button-alone');
    fireEvent.press(button);
    expect(mockOnPressFirst).toHaveBeenCalled();
  });

  it('should render correctly with the second button', () => {
    const {getByText, getByTestId} = render(
      <OnboardItem
        buttonTitleFirst={buttonTitleFirst}
        title={title}
        subtitle={subTitle}
        buttonTitleSecond={buttonTitleSecond}
        imageSource={imageSource}
        onPressFirst={mockOnPressFirst}
        onPressSecond={mockOnPressSecond}
      />,
    );
    expect(getByText(title)).toBeTruthy();
    expect(getByText(subTitle)).toBeTruthy();
    expect(getByTestId('background-image')).toBeTruthy();
    expect(getByText(buttonTitleSecond)).toBeTruthy();
    expect(getByText(buttonTitleFirst)).toBeTruthy();
    const firstButton = getByTestId('first-button');
    fireEvent.press(firstButton);
    expect(mockOnPressFirst).toHaveBeenCalled();
    const secondButton = getByTestId('second-button');
    fireEvent.press(secondButton);
    expect(mockOnPressSecond).toHaveBeenCalled();
  });
});
