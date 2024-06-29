import {Component, inject} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {AsyncPipe, JsonPipe} from "@angular/common";

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

  authService = inject(AuthService)

  projects$ = this.authService.project()
}
