import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { SkeletonImageComponent } from './skeleton-image.component';
import { SkeletonTextComponent } from './skeleton-text.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'message-group',
  standalone: true,
  template: `
    <div>
      <div>
        <skeleton-image></skeleton-image>
      </div>
      <div>
        <skeleton-text></skeleton-text>
        <skeleton-text></skeleton-text>
        <skeleton-text></skeleton-text>
      </div>
    </div>
  `,
  imports: [SkeletonImageComponent, SkeletonTextComponent],
})
export class MessageGroupComponent {}
