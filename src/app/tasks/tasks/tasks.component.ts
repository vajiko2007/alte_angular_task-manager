import {Component, inject} from '@angular/core';
import {Column, Task} from "../../models/column";
import {Board} from "../../models/board";
import {RouterOutlet} from "@angular/router";
import {
  CdkDrag, CdkDragDrop,
  CdkDragPlaceholder, CdkDragPreview,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {NgForOf} from "@angular/common";
import {ModalService} from "../../services/modal.service";
import {AddTaskComponent} from "../add-task/add-task.component";

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterOutlet,
    CdkDropList,
    CdkDropListGroup,
    CdkDrag,
    NgForOf,
    CdkDragPlaceholder,
    CdkDragPreview
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.scss'
})
export class TasksComponent {
  modalService = inject(ModalService)


  board = new Board('Test Board', [
    new Column('ToDo', [
      {
        name: 'ToDo task 1',
        description: 'todo idea',
        status: 'Todo'
      }
    ]),
    new Column('InProgress', [
      {
        name: 'InProgress task 1',
        description: 'InProgress idea',
        status: 'InProgress'
      }
    ]),
    new Column('Done', [
      {
        name: 'Done task 1',
        description: 'Done idea',
        status: 'Done'
      }
    ])
  ])

  drop($event: CdkDragDrop<Task[], any>) {
    if ($event.previousContainer === $event.container) {
      moveItemInArray($event.container.data, $event.previousIndex, $event.currentIndex);
    } else {
      transferArrayItem(
        $event.previousContainer.data,
        $event.container.data,
        $event.previousIndex,
        $event.currentIndex);
    }
  }

  addTask() {
    this.modalService.open(AddTaskComponent, {
      data: {},
      width: 500,
      height: 500,
      backdrop: true,
      closeOnBackdropClick: true,
      panelClass: "add-task-modal"
    })
  }
}
