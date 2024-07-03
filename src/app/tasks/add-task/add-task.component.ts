import {Component, inject} from '@angular/core';
import {MODAL_DATA} from "../../services/modal.service";

@Component({
  selector: 'app-add-task',
  standalone: true,
  imports: [],
  templateUrl: './add-task.component.html',
  styleUrl: './add-task.component.scss'
})
export class AddTaskComponent {

  data = inject(MODAL_DATA)
}
