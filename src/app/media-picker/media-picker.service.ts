import { Injectable, signal } from '@angular/core';
import { MediaPickerMediaType } from './media-picker.definitions';

@Injectable({ providedIn: 'root' })
export class MediaPickerService {
    private _visible = signal(false);
    private _activeTab = signal<MediaPickerMediaType>(MediaPickerMediaType.Emoji);
  
    readonly visible = this._visible;
    readonly activeTab = this._activeTab;
  
    open(tab: MediaPickerMediaType) {
      this._activeTab.set(tab);
      this._visible.set(true);
    }
  
    close() {
      this._visible.set(false);
    }
  
    toggle(tab: MediaPickerMediaType) {
      if (this._visible() && this._activeTab() === tab) {
        this._visible.set(false);
      } else {
        this._activeTab.set(tab);
        this._visible.set(true);
      }
    }
}