import {
  ChangeDetectionStrategy,
  Component,
  HostBinding,
  Input,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'skeleton-image',
  standalone: true,
  styles: [
    `
      .skeleton-image {
        --skeleton-image-color-1: #404040;
        --skeleton-image-color-2: #212223;

        width: 100%;
        max-width: 100%;
        display: block;
        animation: skeleton-image-loading 1s linear infinite alternate;
      }

      @keyframes skeleton-image-loading {
        0% {
          background-color: var(--skeleton-image-color-1);
        }
        100% {
          background-color: var(--skeleton-image-color-2);
        }
      }
    `,
  ],
  template: ``,
})
export class SkeletonImageComponent {
  @Input()
  set aspectRatio(value: string) {
    this._aspectRatio = this.convertAspectRatio(value);
  }
  get aspectRatio() {
    return this._aspectRatio;
  }
  private _aspectRatio = '1 / 1';

  @HostBinding('class')
  get elementClasses() {
    return {
      'skeleton-image': true,
    };
  }

  @HostBinding('style.aspectRatio')
  get hostAspectRatio() {
    return this.aspectRatio;
  }

  private convertAspectRatio(value: string): string {
    if (value.includes(':')) {
      return value.replace(':', ' / ');
    } else {
      return value;
    }
  }
}
