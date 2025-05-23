import { Component, EventEmitter, Input, Output } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MediaPickerItem } from "../media-picker.definitions";
import { MediaPickerPanelStickerComponent } from "./media-picker-panel-sticker.component";
import { MediaPickerPanelGifComponent } from "./media-picker-panel-gif.component";
import { MediaPickerPanelEmojiComponent } from "./media-picker-panel-emoji.component";
import {
  IonSegment,
  IonSegmentButton,
  IonLabel,
  IonSegmentView,
  IonSegmentContent,
} from "@ionic/angular/standalone";

@Component({
  selector: "media-picker",
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
  host: {
    class: "media-picker block",
  },
  template: `
    <div class="p-2">
      <ion-segment mode="ios">
        <ion-segment-button value="emoji" content-id="emoji">
          <ion-label>Emoji</ion-label>
        </ion-segment-button>

        <ion-segment-button value="sticker" content-id="sticker">
          <ion-label>Sticker</ion-label>
        </ion-segment-button>
        
        <ion-segment-button value="gif" content-id="gif">
          <ion-label>GIF</ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>

    <ion-segment-view>
      <ion-segment-content id="emoji">
        <media-picker-panel-emoji (selectEmoji)="onSelect($event)"></media-picker-panel-emoji>
      </ion-segment-content>

      <ion-segment-content id="sticker">
        <media-picker-panel-sticker (selectSticker)="onSelect($event)"></media-picker-panel-sticker>
      </ion-segment-content>

      <ion-segment-content id="gif">
        <media-picker-panel-gif (selectGif)="onSelect($event)"></media-picker-panel-gif>
      </ion-segment-content>
    </ion-segment-view>
  `,
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
