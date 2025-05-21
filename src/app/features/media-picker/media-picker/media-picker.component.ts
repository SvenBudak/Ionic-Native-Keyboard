import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MediaPickerItem } from '../media-picker.definitions';
import { MediaPickerPanelStickerComponent } from '../panel-sticker/panel-sticker.component';
import { MediaPickerPanelGifComponent } from '../panel-gif/panel-gif.component';
import { MediaPickerPanelEmojiComponent } from '../panel-emoji/panel-emoji.component';
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
} from '@ionic/angular/standalone';

@Component({
  selector: 'media-picker',
  standalone: true,
  imports: [
    IonLabel,
    IonSegmentButton,
    IonSegment,
    IonSegmentView,
    IonSegmentContent,
    CommonModule,
    MediaPickerPanelEmojiComponent,
    MediaPickerPanelGifComponent,
    MediaPickerPanelStickerComponent,
  ],
  templateUrl: './media-picker.component.html',
  styleUrls: ['./media-picker.component.css'],
})
export class MediaPickerComponent {
  @Input() initialIndex = 0;

  @Output() select = new EventEmitter<MediaPickerItem>();

  onTabChange(index: number) {
    this.initialIndex = index;
  }

  onSelect(item: MediaPickerItem) {
    this.select.emit(item);
  }
}
