export class UpdateCommonChatDto {
  readonly chatId: number;
  readonly userId: number;
  readonly name?: string;
  readonly image?: string;
}
