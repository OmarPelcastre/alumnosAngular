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
  carreras:any[];

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
      this.getCarreras();
    })
    
    
  }

  async renameCarreras(){
    await console.log(this.carreras);
    console.log(this.users);
    this.users.forEach(async user => {
      console.log(parseInt(user.carrera));
      let index = this.carreras.findIndex(i => i.id === user.carrera);
      user.carrera = await this.carreras[index].nombre_carrera;
    })
  }

  getCarreras(){
    this.apiService.getCarreras().subscribe(async response => {
		  
      this.carreras = await response;
      console.log(response);
      this.renameCarreras();
    })
    
  }

  setCarrera(id){
    this.user.carrera = id;
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
    this.user.carrera = '2';
    this.user.sexo = this.users[index].sexo;
    this.user.erase = 'true';
    this.apiService.deleteUser(item.id, this.user).subscribe(response => {
      console.log(response);
      this.ngOnInit();
    })
  }

  busqueda: string;
  usersAux: User[];
  buscar() {
    if (this.busqueda == '') {
      this.ngOnInit();
    } else {
      console.log(this.busqueda);
      let nombres = this.users.filter(users => {
        return users.nombre.includes(this.busqueda);
      })
      
      let edades = this.users.filter(users => {
        return users.edad.includes(this.busqueda);
      })

      let carreras = this.users.filter(users => {
        return users.carrera.includes(this.busqueda);
      })


      console.log(nombres); // [{name: "Nepal", continent: "Asia"}]

      this.usersAux = this.users;
      this.users = nombres.concat(edades).concat(carreras);
    }

  }


}
