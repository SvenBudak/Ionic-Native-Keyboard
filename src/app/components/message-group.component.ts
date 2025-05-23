import {
  ChangeDetectionStrategy,
  Component,
  Input,
  ViewEncapsulation,
} from "@angular/core";
import { SkeletonImageComponent } from "./skeleton-image.component";
import { SkeletonTextComponent } from "./skeleton-text.component";
import { CommonModule } from "@angular/common";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "message-group",
  standalone: true,
  host: {
    class: "p-4 block",
  },
  template: `
    <div
      class="grid gap-4"
      [ngClass]="{
        'grid-cols-[56px_1fr]': direction === 'left',
        'grid-cols-[1fr_56px]': direction === 'right'
      }"
    >
      <div [class.order-last]="direction === 'right'">
        <skeleton-image [disableAnimation]="true" class="rounded-full"></skeleton-image>
      </div>
      <div>
        @for(_ of messageCount; track $index) {
          <skeleton-text [disableAnimation]="true" [align]="direction"></skeleton-text>
        }
      </div>
    </div>
  `,
  imports: [CommonModule, SkeletonImageComponent, SkeletonTextComponent],
})
export class MessageGroupComponent {
  @Input() direction: "left" | "right" = "left";

    public messageCount = Array(Math.floor(Math.random() * 4) + 3);
}
