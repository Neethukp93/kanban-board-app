import { CdkDrag, CdkDropList, CdkDropListGroup } from '@angular/cdk/drag-drop';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSnackBar } from '@angular/material/snack-bar';

import { BoardComponent } from '../board/board.component';
import { CreateItemComponent } from '../create-item/create-item.component';
import { ItemComponent } from '../item/item.component';
import { BoardConfiguration } from '../models/boardConfiguration';
@Component({
  selector: 'app-kanban-board',
  standalone: true,
  imports: [
    CommonModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    BoardComponent,
    ItemComponent,
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    MatButtonModule,
  ],
  templateUrl: './kanban-board.component.html',
  styleUrl: './kanban-board.component.scss',
})
export class KanbanBoardComponent implements OnInit {
  boardsConfigurations: BoardConfiguration[] = [];

  constructor(public dialog: MatDialog, private _snackBar: MatSnackBar) {}

  ngOnInit(): void {
    this.boardsConfigurations = [
      { taskList: [], heading: 'To Do', headingClass: 'todo' },
      { taskList: [], heading: 'Implementing', headingClass: 'implementing' },
      { taskList: [], heading: 'Done', headingClass: 'done' },
    ];
  }

  createTask(): void {
    const dialogRef = this.dialog.open(CreateItemComponent, {
      height: '300px',
      width: '300px',
    });
    dialogRef.afterClosed().subscribe((task) => {
      if (task) {
        this.boardsConfigurations[0].taskList.push(task);
        this._snackBar.open('Added new task successfully!', '', {
          verticalPosition: 'top',
          horizontalPosition: 'right',
          duration: 2000,
        });
      }
    });
  }
}
