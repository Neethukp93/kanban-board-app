import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-item',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.scss',
})
export class ItemComponent {
  @Input()
  title: string = '';
  @Output()
  deleteClicked = new EventEmitter<string>();

  delete() {
    this.deleteClicked.emit(this.title);
  }
}
