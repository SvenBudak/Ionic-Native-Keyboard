import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from "@angular/core";
import { MessageGroupComponent } from "./message-group.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: "message-list",
  standalone: true,
  host: {
    class: "p-4 block",
  },
  template: `
    @for(direction of directions; track $index) {
      <message-group [direction]="direction"></message-group>
    }
  `,
  imports: [MessageGroupComponent],
})
export class MessageListComponent {
  public directions = Array.from({ length: 8 }, () => Math.random() < 0.5 ? "left" : "right") as ("left" | "right")[];
}
