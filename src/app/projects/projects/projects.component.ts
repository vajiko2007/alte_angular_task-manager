import {Component, inject} from '@angular/core';
import {AsyncPipe, JsonPipe} from "@angular/common";
import {ProjectService} from "../../services/project.service";

@Component({
  selector: 'app-projects',
  standalone: true,
  imports: [
    AsyncPipe,
    JsonPipe
  ],
  templateUrl: './projects.component.html',
  styleUrl: './projects.component.scss'
})
export class ProjectsComponent {

  ProjectService = inject(ProjectService)

  projects$ = this.ProjectService.project()

}
