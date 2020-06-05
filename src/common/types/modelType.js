import { shape, string } from 'prop-types';
import makeType from './makeType';


const modelType = shape({
  id: string,
  make: makeType,
  name: string,
});

export default modelType;
