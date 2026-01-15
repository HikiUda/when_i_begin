import { $host, $authHost } from '.';

export const updateRating = async (deviceId: number, rate: number) => {
   const data = await $authHost.put('api/rating', { deviceId, rate });
   return data;
};
export const getRating = async (deviceId: number) => {
   const data = await $authHost.get<{ rate: number }>(`api/rating/${deviceId}`);
   return data;
};
export const deleteRating = async (deviceId: number) => {
   const data = await $authHost.delete(`api/rating/${deviceId}`);
   return data;
};
