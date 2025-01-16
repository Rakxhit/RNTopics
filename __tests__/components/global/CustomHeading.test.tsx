import CustomHeading from '../../../src/components/global/CustomHeading';
import {fireEvent, render} from '@testing-library/react-native';
import {goBack} from '../../../src/utils/NavigationUtil';
jest.mock('../../../src/utils/NavigationUtil', () => ({
  goBack: jest.fn(),
}));
describe('Customheader Component', () => {
  it('should render the given text correctly', () => {
    const title = 'HEY THERE';
    const {getByText} = render(<CustomHeading title={title} />);
    expect(getByText(title)).toBeTruthy();
  });

  it('should handle the press event ', () => {
    const {getByTestId} = render(<CustomHeading title="Test" />);
    const backButton = getByTestId('back-button');
    fireEvent.press(backButton);
    expect(goBack).toHaveBeenCalled();
  });

  it('should match the snapshot', () => {
    const {toJSON} = render(<CustomHeading title="Test" />);
    expect(toJSON()).toMatchSnapshot();
  });
});
