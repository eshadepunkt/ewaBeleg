import { Book } from 'src/components/models';

export interface IProduct {
  productItems: Book[];
}

function state(): IProduct {
  return {
    productItems: [],
  };
}

export default state;
