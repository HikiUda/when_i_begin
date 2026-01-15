import { IProducts, IPurchesProducts } from '../helpers/products';

export interface ICotologProducts {
   products: IProducts[] | IPurchesProducts[];
   disabled: boolean;
}
