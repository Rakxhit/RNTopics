import {Dimensions, PixelRatio} from 'react-native';

export const normalizeModerately = (size: number, factor = 0.5): number => {
  return PixelRatio.roundToNearestPixel(size, factor);
};

export const normalizeWidth = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size);
};

export const normalizeHeight = (size: number): number => {
  return PixelRatio.roundToNearestPixel(size);
};

export const screenWidth: number = Dimensions.get('window').width;
export const screenHeight: number = Dimensions.get('window').height;
