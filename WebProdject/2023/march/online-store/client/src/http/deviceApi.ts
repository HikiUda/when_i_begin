import { $host, $authHost } from '.';

import { IBrand, IDevice, IType } from '../store/DeviceStore';

export interface IDeviceApi {
   count: number;
   rows: IDevice[];
}

export interface IOneDeviceApi extends IDevice {
   info: any[];
}

export const createType = async (name: string) => {
   const { data } = await $authHost.post('api/type', { name });
   return data;
};
export const fetchTypes = async () => {
   const { data } = await $host.get<IType[]>('api/type');
   return data;
};
export const createBrand = async (name: string) => {
   const { data } = await $authHost.post('api/brand', { name });
   return data;
};
export const fetchBrands = async () => {
   const { data } = await $host.get<IBrand[]>('api/brand');
   return data;
};
export const createDevices = async (device: any) => {
   const { data } = await $authHost.post<IOneDeviceApi>('api/device', device);
   //console.log(data);
   return data;
};
export const fetchDevices = async (
   typeId: number | undefined,
   brandId: number | undefined,
   page = 1,
   limit = 3,
) => {
   const { data } = await $host.get<IDeviceApi>('api/device', {
      params: { brandId, typeId, limit, page },
   });
   //console.log(data);
   return data;
};
export const fetchOneDevice = async (id: string | undefined) => {
   const { data } = await $host.get<IOneDeviceApi>(`api/device/${id}`);
   console.log(data);
   return data;
};
