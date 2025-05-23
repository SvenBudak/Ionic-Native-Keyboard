import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from "@angular/core";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "skeleton-text",
  standalone: true,
  imports: [CommonModule],
  host: {
    class: "skeleton-text flex flex-col",
    "[style.--skeleton-text-color-1]": "'#404040'",
    "[style.--skeleton-text-color-2]": "'#212223'",
  },
  template: `
    @for (line of [].constructor(lines); track $index) {
      <span
        class="block relative"
        [ngClass]="{
          'mr-auto': align === 'left',
          'mx-auto': align === 'center',
          'ml-auto': align === 'right'
        }"
        [style.width]="randomWidth()"
        >&nbsp;
        <span
          class="skeleton-content w-full top-1/2 left-1/2 block absolute rounded-sm leading-none -translate-x-1/2 -translate-y-1/2"
          [style.animation]="
            disableAnimation
              ? null
              : 'skeleton-text-loading 1s linear infinite alternate'
          "
          [style.backgroundColor]="
            disableAnimation ? 'var(--skeleton-text-color-1)' : null
          "
          >&nbsp;</span
        >
      </span>
    }
  `,
  styles: [
    `
      @keyframes skeleton-text-loading {
        0% {
          background-color: var(--skeleton-text-color-1);
        }
        100% {
          background-color: var(--skeleton-text-color-2);
        }
      }
    `,
  ],
})
export class SkeletonTextComponent {
  @Input() align: "left" | "center" | "right" = "left";
  @Input() lines = 1;
  @Input() width?: string;
  @Input() disableAnimation = false;

  randomWidth(): string {
    if (!this.width) {
      return Math.floor(Math.random() * 21) + 80 + "%";
    }
    return this.width + "%";
  }
}
