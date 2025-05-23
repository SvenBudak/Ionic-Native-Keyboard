import {
  AfterViewInit,
  Component,
  computed,
  EventEmitter,
  inject,
  OnDestroy,
  Output,
  signal,
} from "@angular/core";
import { CommonModule } from "@angular/common";

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from "@angular/animations";
import { MediaPickerComponent } from "./media-picker.component";
import { MediaPickerMediaType } from "../media-picker.definitions";
import { MediaPickerService } from "../media-picker.service";

import {
  Keyboard,
  KeyboardInfo,
  KeyboardResize,
  KeyboardResizeOptions,
} from "@capacitor/keyboard";
import { Preferences } from "@capacitor/preferences";
import { AnimationEvent } from "@angular/animations";

const PREF_KEY = "mediaPicker.keyboardHeight";
const FALLBACK_HEIGHT = 250;

@Component({
  selector: "media-picker-mobile-wrapper",
  standalone: true,
  imports: [CommonModule, MediaPickerComponent],
  template: `
    <!-- Spacer -->
    <div class="w-full h-[var(--keyboard-height)]" *ngIf="showSpacer()"></div>

    <media-picker
      class="h-full block right-0 bottom-0 left-0 absolute bg-[#13181c] will-change-transform"
      [@slide]="visible()"
      (@slide.start)="onAnimationStart($event)"
      (@slide.done)="onAnimationDone($event)"
      [initialIndex]="initialIndex()"
      (select)="onSelect($event)"
    ></media-picker>
  `,
  host: {
    class: "media-picker-mobile-wrapper block relative",
    "[style.--keyboard-height.px]": "_keyboardHeight()",
  },
  animations: [
    trigger("slide", [
      state("false", style({ transform: "translateY(100%)" })),
      state("true", style({ transform: "translateY(0)" })),
      transition("false <=> true", animate("300ms ease-in-out")),
    ]),
  ],
})
export class MediaPickerMobileWrapperComponent
  implements AfterViewInit, OnDestroy
{
  // Dependencies
  private readonly service = inject(MediaPickerService);

  // Const
  public readonly MediaType = MediaPickerMediaType;

  // Signals (UI State)
  public readonly visible = this.service.visible;
  public readonly activeTab = this.service.activeTab;
  public readonly isAnimating = signal(false);
  public readonly showSpacer = computed(
    () => this.visible() || this.isAnimating()
  );
  private readonly _keyboardHeight = signal(FALLBACK_HEIGHT);

  // Native Event Listener Handles
  private keyboardWillShowListener?: { remove: () => void };
  // private keyboardWillHideListener?: { remove: () => void };

  @Output() public mediaSelect = new EventEmitter<{
    url: string;
    type: string;
  }>();

  async ngAfterViewInit() {
    // Set keyboard mode to none when picker is active
    const resizeOptions: KeyboardResizeOptions = { mode: KeyboardResize.None };
    await Keyboard.setResizeMode(resizeOptions);

    const stored = await Preferences.get({ key: PREF_KEY });
    if (stored.value) {
      this._keyboardHeight.set(parseInt(stored.value, 10));
    }

    this.keyboardWillShowListener = await Keyboard.addListener(
      "keyboardWillShow",
      async (info: KeyboardInfo) => {
        const height = Math.round(info.keyboardHeight);
        this._keyboardHeight.set(height);
        await Preferences.set({ key: PREF_KEY, value: height.toString() });
        this.service.close();
      }
    );

    /* Maybe later needed
    this.keyboardWillHideListener = await Keyboard.addListener(
      "keyboardWillHide",
      () => {}
    );
    */
  }

  onAnimationStart(_: AnimationEvent) {
    this.isAnimating.set(true);
  }

  onAnimationDone(_: AnimationEvent) {
    this.isAnimating.set(false);
  }

  onSelect(media: { url: string; type: string }) {
    this.service.close();
    this.mediaSelect.emit(media);
  }

  public readonly initialIndex = computed(() => {
    switch (this.activeTab()) {
      case this.MediaType.Emoji: return 0;
      case this.MediaType.Gif: return 1;
      default: return 2;
    }
  });

  async ngOnDestroy(): Promise<void> {
    this.keyboardWillShowListener?.remove();
    // this.keyboardWillHideListener?.remove();

    // Reset keyboard resize mode when picker is destroyed
    const resizeOptions: KeyboardResizeOptions = {
      mode: KeyboardResize.Native,
    };
    await Keyboard.setResizeMode(resizeOptions);
  }
}
