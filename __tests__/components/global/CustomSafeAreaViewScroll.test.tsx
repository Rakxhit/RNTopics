import {Text} from 'react-native';
import CustomSafeAreaScrollView from '../../../src/components/global/CustomSafeAreaViewScroll';
import {render} from '@testing-library/react-native';

describe('CustomSafeAreaViewScroll component', () => {
  it('should render ', () => {
    const {getByText} = render(
      <CustomSafeAreaScrollView>
        <Text>First Text</Text>
      </CustomSafeAreaScrollView>,
    );
    expect(getByText('First Text')).toBeTruthy();
  });
  it('should render correctly', () => {
    const {toJSON} = render(
      <CustomSafeAreaScrollView>
        <Text>Test Text</Text>
      </CustomSafeAreaScrollView>,
    );
    expect(toJSON()).toMatchSnapshot();
  });
});
