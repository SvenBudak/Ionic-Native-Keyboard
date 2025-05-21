import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPickerItem } from '../media-picker.definitions';

@Component({
  selector: 'media-picker-panel-gif',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Hier kommen später GIFs</div>`,
})
export class MediaPickerPanelGifComponent {
  @Output() selectGif = new EventEmitter<MediaPickerItem>();
}
