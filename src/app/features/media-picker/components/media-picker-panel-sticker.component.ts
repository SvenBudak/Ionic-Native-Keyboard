import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPickerItem } from '../media-picker.definitions';

@Component({
  selector: 'media-picker-panel-sticker',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Hier kommen später Sticker</div>`,
})
export class MediaPickerPanelStickerComponent {
  @Output() selectSticker = new EventEmitter<MediaPickerItem>();
}
