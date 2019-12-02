import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: User[];
  user: User;

  constructor(
    private apiService: ApiService
  ) {
    this.user = new User("", "", "", "", "", "", "", "");
  }

  ngOnInit() {
    this.apiService.getUsers().subscribe(response => {
      console.log(response);
      this.users = response;
      this.edit = 'false';
    })
  }

  edit = 'false';
  item
  editUser(id) {
    this.edit = 'true';

    this.item = this.users.find(i => i.id === id);
    let index = this.users.findIndex(i => i.id === id);
    this.user.nombre = this.users[index].nombre;
    this.user.apellidos = this.users[index].apellidos;
    this.user.edad = this.users[index].edad;
    this.user.direccion = this.users[index].direccion;
    this.user.carrera = this.users[index].carrera;
    this.user.sexo = this.users[index].sexo;
    this.user.erase = 'false';
  }

  editNow() {
    this.apiService.updateUser(this.item.id, this.user).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    })
  }

  deleteUser(id) {
    console.log(this.users);
    //this.users.find('id':id);
    let item = this.users.find(i => i.id === id);
    let index = this.users.findIndex(i => i.id === id);
    this.user.nombre = this.users[index].nombre;
    this.user.apellidos = this.users[index].apellidos;
    this.user.edad = this.users[index].edad;
    this.user.direccion = this.users[index].direccion;
    this.user.carrera = this.users[index].carrera;
    this.user.sexo = this.users[index].sexo;
    this.user.erase = 'true';
    this.apiService.deleteUser(item.id, this.user).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    })
  }

  busqueda;
  usersAux: User[];
  buscar() {
    if (this.busqueda == '') {
      this.ngOnInit();
    } else {
      console.log(this.busqueda);
      // this.users.filter(function(nombre){return nombre.(this.busqueda);});
      let nombres = this.users.filter(users => {
        return users.nombre.includes(this.busqueda);
      })
      let carreras = this.users.filter(users => {
        return users.carrera.includes(this.busqueda);
      })

      console.log(nombres); // [{name: "Nepal", continent: "Asia"}]
      console.log(carreras);
      this.usersAux = this.users;
      this.users = nombres.concat(carreras);
    }

  }


}
