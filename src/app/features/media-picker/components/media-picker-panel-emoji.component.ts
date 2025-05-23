import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPickerItem } from '../media-picker.definitions';

@Component({
  selector: 'media-picker-panel-emoji',
  standalone: true,
  imports: [CommonModule],
  template: `<div class="p-4">Hier kommen später Emojis</div>`
})
export class MediaPickerPanelEmojiComponent {
  @Output() selectEmoji = new EventEmitter<MediaPickerItem>();
}