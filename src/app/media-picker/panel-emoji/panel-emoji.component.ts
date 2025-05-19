import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPickerItem } from '../media-picker.definitions';

@Component({
  selector: 'media-picker-panel-emoji',
  standalone: true,
  imports: [CommonModule],
  template: `<div>Hier kommen später Emojis</div>`
})
export class MediaPickerPanelEmojiComponent {
  @Output() selectEmoji = new EventEmitter<MediaPickerItem>();
}