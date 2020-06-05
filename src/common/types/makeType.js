import { shape, number, string } from 'prop-types';

const makeType = shape({
  id: number,
  name: string,
});

export default makeType;
