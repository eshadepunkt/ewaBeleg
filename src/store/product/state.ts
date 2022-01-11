import { Book } from 'src/components/models';

export interface IProduct {
  productItems: Book[];
  productLocalItems: Book[];
}

function state(): IProduct {
  return {
    productItems: [],
    productLocalItems: [],
  };
}

export default state;
