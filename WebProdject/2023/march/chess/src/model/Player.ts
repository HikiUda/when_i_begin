import { Colors } from './Colors';

export class Player {
   color: Colors;
   isCheck: boolean = false;
   isMate: boolean = false;

   constructor(color: Colors) {
      this.color = color;
   }
}
