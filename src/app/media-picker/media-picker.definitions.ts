export enum MediaPickerMediaType {
  Emoji = 'emoji',
  Gif = 'gif',
  Sticker = 'sticker',
}

export interface MediaPickerItem {
  id: string;
  url: string;
  type: MediaPickerMediaType;
}
