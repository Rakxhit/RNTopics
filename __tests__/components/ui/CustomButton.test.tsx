import React from 'react';
import {render} from '@testing-library/react-native';
import CustomButton from '../../../src/components/ui/CustomButton';

describe('Custom Button Component', () => {
  it('should match to the snapshot', () => {
    const textColor = 'white';
    const bgColor = 'red';
    const {getByTestId, getByText} = render(
      <CustomButton
        onPress={jest.fn()}
        title="test title"
        backgroundColor={bgColor}
        loading={false}
        textColor={textColor}
      />,
    );
  });
});
