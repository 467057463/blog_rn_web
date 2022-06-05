import createIconSet from './lib/create-icon-set';
import glyphMap from './glyphmaps/Iconfont.json';

const iconSet = createIconSet(glyphMap, 'Iconfont', 'Iconfont.ttf');

export default iconSet;
export const {
  Button,
  getImageSource,
  getImageSourceSync,
} = iconSet;