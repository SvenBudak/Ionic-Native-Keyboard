import { CommonModule } from '@angular/common';
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
  selector: 'skeleton-text',
  standalone: true,
  imports: [CommonModule],
  template: `
    @for (line of [].constructor(lines); track $index) {
      <span class="skeleton-wrapper block relative" [style.width]="randomWidth()"
      >&nbsp;
        <span class="skeleton-content">&nbsp;</span>
      </span>
    }
  `,
  styles: [
    `
      .skeleton-text {
        --skeleton-text-color-1: #404040;
        --skeleton-text-color-2: #212223;
      }

      .skeleton-content {
        width: 100%;
        top: 50%;
        left: 50%;
        display: block;
        position: absolute;
        border-radius: 0.25rem;
        line-height: 1 !important;
        transform: translate(-50%, -50%);
        animation: skeleton-text-loading 1s linear infinite alternate;
      }

      .skeleton-text-align-left .skeleton-wrapper {
        margin-right: auto;
      }

      .skeleton-text-align-center .skeleton-wrapper {
        margin: auto;
      }

      .skeleton-text-align-right .skeleton-wrapper {
        margin-left: auto;
      }

      .skeleton-text:first-child {
        .skeleton-content {
          margin-top: 0;
        }
      }

      .skeleton-text:last-child {
        .skeleton-content {
          margin-bottom: 0;
        }
      }

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
  @Input() align: 'left' | 'center' | 'right' = 'left';
  @Input() lines = 1;
  @Input() width?: string;

  @HostBinding('class')
  get hostClasses(): string {
    const alignMap = {
      left: 'justify-start',
      center: 'justify-center',
      right: 'justify-end',
    };
    return `skeleton-text flex flex-col ${alignMap[this.align]}`;
  }

  randomWidth(): string {
    if (!this.width) {
      return Math.floor(Math.random() * 21) + 80 + '%';
    }
    return this.width + '%';
  }
}
