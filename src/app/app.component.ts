import { Component } from "@angular/core";
import {
  IonButton,
  IonContent,
  IonFooter,
  IonHeader,
  IonIcon,
  IonTitle,
  IonToolbar,
  IonApp,
} from "@ionic/angular/standalone";
import { MediaPickerMobileWrapperComponent } from "./features/media-picker/mobile-wrapper/mobile-wrapper.component";
import { MediaPickerToggleDirective } from "./features/media-picker/media-picker-toggle.directive";
import { MediaPickerInputDirective } from "./features/media-picker/media-picker-input.directive";
import { MediaPickerMediaType } from "./features/media-picker/media-picker.definitions";
import { MessageListComponent } from "./components/message-list.component";

@Component({
  selector: "app-root",
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
    MessageListComponent,
  ],
  template: `
    <ion-app>
      <ion-header class="ion-no-border">
        <ion-toolbar color="primary">
          <ion-title> Ionic Native Keyboard Challenge </ion-title>
        </ion-toolbar>
      </ion-header>

      <ion-content>
        <message-list></message-list>
      </ion-content>

      <ion-footer class="ion-no-border">
        <div
          class="footer-inner"
          [class.submit-visible]="inputText.length > 0"
          [class.submit-hidden]="inputText.length === 0"
        >
          <div class="textarea-wrapper">
            <ion-button
              fill="clear"
              shape="round"
              size="large"
              [mediaPickerToggle]="MediaPickerMediaType.Emoji"
            >
              <ion-icon
                slot="icon-only"
                src="/icons/very-satisfied.svg"
              ></ion-icon>
            </ion-button>

            <input
              #msgInput
              mediaPickerInput
              placeholder="Type message here..."
              (input)="inputText = msgInput.value"
            />
          </div>

          <div class="submit">
            <ion-button fill="clear" shape="round" size="large">
              <ion-icon
                slot="icon-only"
                src="/icons/rocket-launch.svg"
              ></ion-icon>
            </ion-button>
          </div>
        </div>

        <media-picker-mobile-wrapper
          (mediaSelect)="onMediaSelect($event)"
        ></media-picker-mobile-wrapper>
      </ion-footer>
    </ion-app>
  `,
  styles: [
    `
      .footer-inner {
        --transition-speed: 300ms;

        padding: 8px;
        display: grid;
        grid-template-columns: 1fr 0px;
        grid-column-gap: 8px;
        transition: grid-template-columns var(--transition-speed);

        &.submit-hidde {
          .submit {
            ion-button {
              pointer-events: none;
            }
          }
        }

        &.submit-visible {
          grid-template-columns: 1fr 50px;
          .submit {
            opacity: 1;
          }
        }
      }

      ion-button {
        margin: 0;
        color: currentColor;
      }

      .textarea-wrapper {
        display: grid;
        grid-template-columns: 50px 1fr;
        color: var(--ion-color-primary-contrast);
        border-radius: 4px;
        background-color: var(--ion-color-primary);

        input {
          width: 100%;
          padding: 8px 12px 8px 0;
          outline: none;
          border: none;
          background: none;
          font-size: 14px;
          font-weight: 700;
        }
      }

      .submit {
        overflow: hidden;
        opacity: 0;
        transition: opacity var(--transition-speed);
      }
    `,
  ],
})
export class AppComponent {
  public MediaPickerMediaType = MediaPickerMediaType;

  public inputText: string = '';

  onMediaSelect(item: { url: string; type: string }) {
    console.log(item);
  }
}
