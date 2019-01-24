import { Router } from '@angular/router';
import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  password: String = '';
  email: String = '';
  busy: Promise<any>;

  constructor(public router: Router, public authDataServise: AuthService) {}

  ngOnInit() {
    this.email = '';
    this.password = '';
  }

  login() {
    this.busy = this.authDataServise.login(this.email, this.password).then( r => {
      sessionStorage.setItem('api-token', r.token);
      sessionStorage.setItem('isLoggedin', 'true');
      const userData = { id: r.id, name: r.name };
      sessionStorage.setItem('user', JSON.stringify(userData));
      this.router.navigate(['/main']);
    }).catch( e => {
      swal({
        title: 'Iniciar Sesión',
        text: 'Credenciales Incorrectos',
        icon: 'error',
      })
      .then( response => {
        sessionStorage.clear();
        this.router.navigate(['/login']);
      });
    });
  }

  password_recovery() {
    this.busy = this.authDataServise.password_recovery_request(this.email).then( r => {
      if ( r === 'Success!') {
        swal({
          title: 'Contraseña Recuperada',
          text: 'Para completar el proceso, revisa tu correo',
          icon: 'success',
        })
        .then( response => {
          this.password = '';
          this.email = '';
        });
      } else {
        swal({
          title: 'Contraseña Recuperada',
          text: 'La dirección de correo proporcionada, no corresponde a cuenta alguna',
          icon: 'error',
        })
        .then( response => {
          this.password = '';
          this.email = '';
        });
      }
    }).catch( e => {
      console.log(e);
    });
  }
}
