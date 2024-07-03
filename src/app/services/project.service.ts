import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProjectService {


  apiURl = 'http://localhost:3000/api/';

  httpClient = inject(HttpClient)

  project() {
    return this.httpClient.get(this.apiURl + 'project/all')
  }

  AddProject(projectdata:any){
   return this.httpClient.post<any>(this.apiURl + 'project', projectdata)
  }
}
