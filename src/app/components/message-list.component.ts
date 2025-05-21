import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';
import { MessageGroupComponent } from './message-group.component';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  selector: 'message-list',
  standalone: true,
  template: `
    <message-group></message-group>
    <message-group></message-group>
  `,
  imports: [MessageGroupComponent],
})
export class MessageListComponent {}
