import { makeAutoObservable } from 'mobx';

export interface IBrand {
   id: number;
   name: string;
   createdAt?: string;
   updatedAt?: string;
}
export interface IType {
   id: number;
   name: string;
   createdAt?: string;
   updatedAt?: string;
}
export interface IDevice {
   id: number;
   name: string;
   rating?: number;
   price: number;
   typeId: number;
   brandId: number;
   img: string | any;
   createdAt?: string;
   updatedAt?: string;
}

export default class DeviceStore {
   _brands: IBrand[];
   _types: IType[];
   _devices: IDevice[];
   _selectedType: IType;
   _selectedBrand: IBrand;
   _page: number;
   _totalCount: number;
   _limit: number;
   constructor() {
      this._brands = [];
      this._types = [];
      this._devices = [];
      this._selectedType = {} as IType;
      this._selectedBrand = {} as IBrand;
      this._page = 1;
      this._totalCount = 0;
      this._limit = 3;
      makeAutoObservable(this);
   }
   setBrands(brands: IBrand[]) {
      this._brands = brands;
   }
   setSelectedBrand(brand: IBrand) {
      this._page = 1;
      this._selectedBrand = brand;
   }
   setTypes(types: IType[]) {
      this._types = types;
   }
   setSelectedType(type: IType) {
      this._page = 1;
      this._selectedType = type;
   }
   setDevices(devices: IDevice[]) {
      this._devices = devices;
   }
   setLimit(limit: number) {
      this._limit = limit;
   }
   setPage(page: number) {
      this._page = page;
   }
   setTotalCount(totalCount: number) {
      this._totalCount = totalCount;
   }

   get brands() {
      return this._brands;
   }
   get selectedBrand() {
      return this._selectedBrand;
   }
   get types() {
      return this._types;
   }
   get selectedType() {
      return this._selectedType;
   }
   get devices() {
      return this._devices;
   }
   get page() {
      return this._page;
   }
   get limit() {
      return this._limit;
   }
   get totalPage() {
      return this._totalCount;
   }
}
