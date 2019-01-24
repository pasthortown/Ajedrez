import { HttpModule } from '@angular/http';
import { AuthService } from './../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';

@NgModule({
    imports: [CommonModule, LoginRoutingModule, FormsModule, HttpModule],
    declarations: [LoginComponent],
    providers: [AuthService]
})
export class LoginModule {}
