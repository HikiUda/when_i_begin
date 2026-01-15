import { Chat } from 'src/models/chats.model';

export class ChatDto {
  id: number;
  type: string;
  name: string;
  userId: number | null;
  image: string | null;

  constructor(data: Chat) {
    this.id = data.id;
    this.type = data.type;
    this.name = data.name;
    this.userId = data?.userId && null;
    this.image = data?.image && null;
  }
}
