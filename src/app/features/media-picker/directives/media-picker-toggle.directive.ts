import { Directive, HostListener, Input } from '@angular/core';
import { MediaPickerMediaType } from '../media-picker.definitions';
import { MediaPickerService } from '../media-picker.service';

@Directive({
  selector: '[mediaPickerToggle]',
  standalone: true,
})
export class MediaPickerToggleDirective {
  @Input('mediaPickerToggle') tab: MediaPickerMediaType = MediaPickerMediaType.Emoji;

  constructor(private ctrl: MediaPickerService) {}

  @HostListener('click')
  onClick() {
    this.ctrl.toggle(this.tab);
  }
}
