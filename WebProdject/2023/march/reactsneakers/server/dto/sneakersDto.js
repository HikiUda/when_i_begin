class SneakersDto {
   id;
   title;
   price;
   img;
   inCart;
   isLiked;

   constructor(model) {
      this.id = model.sneakers_id;
      this.title = model.title;
      this.img = model.img;
      this.price = model.price;
      this.isLiked = model.is_liked;
      this.inCart = model.in_cart;
   }
}

function inSneakersDto(arr) {
   const arrDto = [];
   for (let i = 0; i < arr.length; i++) {
      const item = new SneakersDto(arr[i]);
      arrDto.push(item);
   }
   return arrDto;
}

module.exports = {
   SneakersDto,
   inSneakersDto,
};
