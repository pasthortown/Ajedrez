import { AuthService } from './../services/auth.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { RegisterRoutingModule } from './register-routing.module';
import { RegisterComponent } from './register.component';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
    imports: [CommonModule, RegisterRoutingModule, FormsModule, HttpModule],
    declarations: [RegisterComponent],
    providers: [AuthService]
})
export class RegisterModule {}
