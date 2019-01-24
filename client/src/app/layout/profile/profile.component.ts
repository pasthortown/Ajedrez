import { UserService } from './../../services/CRUD/user.service';
import { User } from './../../models/User';
import { AuthService } from './../../services/auth.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import swal from 'sweetalert';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  cambiandoClaves = false;
  clavesCoinciden = false;
  clave: String = '';
  claveConfirm: String = '';
  user: User;
  archivo = { nombre: '', tipo: '', bytes: null };
  @ViewChild('fotoInput') fotoInput;

  constructor(public authDataServise: AuthService, public userDataService: UserService) {
    this.user = new User();
  }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
    this.userDataService.get(JSON.parse(sessionStorage.getItem('user')).id).then( r => {
      this.user = r as User;
    }).catch( e => console.log(e));
  }

  verificarCambioClaves() {
    if (this.clave.length !== 0 || this.claveConfirm.length !== 0) {
      this.cambiandoClaves = true;
    } else {
      this.cambiandoClaves = false;
    }
    if (this.clave === this.claveConfirm) {
      this.clavesCoinciden = true;
    } else {
      this.clavesCoinciden = false;
    }
  }

  subirFoto() {
    this.fotoInput.nativeElement.click();
  }

  CodificarArchivo(event) {
    const reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      const file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.archivo.nombre = file.name;
        this.archivo.tipo = file.type;
        this.archivo.bytes = reader.result;
      };
    }
  }

  guardar() {
    this.userDataService.put(this.user).then( r => {
      if (this.cambiandoClaves && this.clavesCoinciden) {
        this.actualizarClave();
      } else {
        swal({
          title: 'Datos Guardados',
          text: 'Datos guardados satisfactoriamente. Cierre sesión para visualizar los cambios.',
          icon: 'success',
        });
      }
    }).catch ( e => console.log(e));
  }

  actualizarClave() {
    this.authDataServise.password_change(this.clave).then( r => {
      swal({
        title: 'Datos Guardados',
        text: 'Datos guardados satisfactoriamente. Cierre sesión y utilice su nueva contraseña',
        icon: 'success',
      });
    }).catch( e => {
      console.log(e);
    });
  }
}
