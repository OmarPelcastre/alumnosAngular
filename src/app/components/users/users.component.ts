import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: [];

  constructor(
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.apiService.getUsers().subscribe(response => {
      console.log(response);
      this.users = response;
    })
  }

  

}
