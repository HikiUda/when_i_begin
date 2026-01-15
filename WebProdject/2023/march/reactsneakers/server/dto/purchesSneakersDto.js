const { SneakersDto } = require('./sneakersDto');

class PurchesSneakersDto extends SneakersDto {
   purchesId;

   constructor(model) {
      super(model);
      this.sneakersId = model.sneakers_id;
      this.id = model.purches_id;
   }
}

function inPurchesSneakersDto(arr) {
   const arrDto = [];
   for (let i = 0; i < arr.length; i++) {
      const item = new PurchesSneakersDto(arr[i]);
      arrDto.push(item);
   }
   return arrDto;
}

module.exports = {
   inPurchesSneakersDto,
   PurchesSneakersDto,
};
