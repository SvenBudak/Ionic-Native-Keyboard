import {
  AfterViewInit,
  Component,
  computed,
  EventEmitter,
  HostBinding,
  inject,
  OnDestroy,
  Output,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';

import { animate, state, style, transition, trigger } from '@angular/animations';
import { MediaPickerComponent } from '../media-picker/media-picker.component';
import { MediaPickerMediaType } from '../media-picker.definitions';
import { MediaPickerService } from '../media-picker.service';

import { Keyboard, KeyboardInfo, KeyboardResize, KeyboardResizeOptions } from '@capacitor/keyboard';
import { Preferences } from '@capacitor/preferences';
import { AnimationEvent } from '@angular/animations';

const PREF_KEY = 'mediaPicker.keyboardHeight';
const FALLBACK_HEIGHT = 250;

@Component({
  selector: 'media-picker-mobile-wrapper',
  standalone: true,
  imports: [CommonModule, MediaPickerComponent],
  templateUrl: './mobile-wrapper.component.html',
  styleUrls: ['./mobile-wrapper.component.scss'],
  animations: [
    trigger('slide', [
      state('false', style({ transform: 'translateY(100%)' })),
      state('true', style({ transform: 'translateY(0)' })),
      transition('false <=> true', animate('300ms ease-in-out')),
    ]),
  ],
})
export class MediaPickerMobileWrapperComponent implements AfterViewInit, OnDestroy {
  // Dependencies
  private readonly service = inject(MediaPickerService);

  // Const
  public readonly MediaType = MediaPickerMediaType;

  // Signals (UI State)
  public readonly visible = this.service.visible;
  public readonly activeTab = this.service.activeTab;
  public readonly isAnimating = signal(false);
  public readonly showSpacer = computed(() => this.visible() || this.isAnimating());
  private readonly _keyboardHeight = signal(FALLBACK_HEIGHT);

  // Native Event Listener Handles
  private keyboardWillShowListener?: { remove: () => void };
  private keyboardWillHideListener?: { remove: () => void };

  @Output() public mediaSelect = new EventEmitter<{ url: string; type: string }>();

  @HostBinding('style.--keyboard-height')
  get cssKeyboardHeight(): string {
    return `${this._keyboardHeight()}px`;
  }

  async ngAfterViewInit() {
    // Set keyboard mode to none when picker is active
    const resizeOptions: KeyboardResizeOptions = { mode: KeyboardResize.None };
    await Keyboard.setResizeMode(resizeOptions);

    const stored = await Preferences.get({ key: PREF_KEY });
    if (stored.value) {
      this._keyboardHeight.set(parseInt(stored.value, 10));
    }

    this.keyboardWillShowListener = await Keyboard.addListener('keyboardWillShow', async (info: KeyboardInfo) => {
      const height = Math.round(info.keyboardHeight);
      this._keyboardHeight.set(height);
      await Preferences.set({ key: PREF_KEY, value: height.toString() });
      this.service.close();
    });

    this.keyboardWillHideListener = await Keyboard.addListener('keyboardWillHide', () => {});
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

  async ngOnDestroy(): Promise<void> {
    this.keyboardWillShowListener?.remove();
    this.keyboardWillHideListener?.remove();

    // Reset keyboard resize mode when picker is destroyed
    const resizeOptions: KeyboardResizeOptions = { mode: KeyboardResize.Native };
    await Keyboard.setResizeMode(resizeOptions);
  }
}
