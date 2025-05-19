import { Component } from '@angular/core';
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonApp,
} from '@ionic/angular/standalone';
import { MediaPickerMobileWrapperComponent } from './media-picker/mobile-wrapper/mobile-wrapper.component';
import { MediaPickerToggleDirective } from './media-picker/media-picker-toggle.directive';
import { MediaPickerInputDirective } from './media-picker/media-picker-input.directive';
import { MediaPickerMediaType } from './media-picker/media-picker.definitions';

@Component({
  selector: 'app-root',
  imports: [
    IonApp,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonFooter,
    IonIcon,
    IonButton,
    MediaPickerMobileWrapperComponent,
    MediaPickerToggleDirective,
    MediaPickerInputDirective,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  public MediaPickerMediaType = MediaPickerMediaType;

  onMediaSelect(item: { url: string; type: string }) {
    console.log(item);
  }
}
