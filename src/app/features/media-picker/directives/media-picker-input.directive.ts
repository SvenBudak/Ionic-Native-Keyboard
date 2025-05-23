import { Directive, HostListener } from '@angular/core';
import { MediaPickerService } from '../media-picker.service';

@Directive({
  selector: '[mediaPickerInput]',
  standalone: true,
})
export class MediaPickerInputDirective {
  constructor(private ctrl: MediaPickerService) {}

  @HostListener('focus')
  onFocus() {
    this.ctrl.close();
  }
}
