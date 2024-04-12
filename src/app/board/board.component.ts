import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ItemComponent } from '../item/item.component';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    CommonModule,
    ItemComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.scss',
})
export class BoardComponent {
  @Input()
  taskList: string[] = [];
  @Input()
  heading: string = '';
  @Input()
  headingClass: string = '';

  constructor(private _snackBar: MatSnackBar) {}

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
  deleteTask(task: string) {
    this.taskList = this.taskList.filter((taskItem) => taskItem !== task);
    this._snackBar.open('Deleted the task successfully!', '', {
      verticalPosition: 'top',
      horizontalPosition: 'right',
      duration: 2000,
    });
  }
}
