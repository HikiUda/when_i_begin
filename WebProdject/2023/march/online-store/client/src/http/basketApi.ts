import { $host, $authHost } from '.';
import { IDevice } from '../store/DeviceStore';

export const addItemBasket = async (deviceId: number) => {
   const data = await $authHost.post('api/basket', { deviceId });
   return data;
};
export const getBasket = async () => {
   const data = await $authHost.get<IDevice[]>(`api/basket`);
   return data;
};
export const deleteItemBasket = async () => {
   const data = await $authHost.delete(`api/basket`);
   return data;
};
