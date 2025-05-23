import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "skeleton-image",
  standalone: true,
  host: {
    class: "skeleton-image w-full max-w-full block",
    "[style.--skeleton-image-color-1]": "'#404040'",
    "[style.--skeleton-image-color-2]": "'#212223'",
    "[style.aspect-ratio]": "aspectRatio.replace(':', ' / ')",
    "[style.animation]": "disableAnimation ? null : 'skeleton-image-loading 1s linear infinite alternate'",
    "[style.backgroundColor]": "disableAnimation ? 'var(--skeleton-image-color-1)' : null",
  },
  template: ``,
  styles: [
    `
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
})
export class SkeletonImageComponent {
  @Input() aspectRatio = "1 / 1";
  @Input() disableAnimation = false;
}
