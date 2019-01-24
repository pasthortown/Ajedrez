import { HttpModule } from '@angular/http';
import { AuthService } from './../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './profile.component';
import { UserService } from 'src/app/services/CRUD/user.service';

@NgModule({
  imports: [CommonModule, ProfileRoutingModule, FormsModule, HttpModule],
  declarations: [ProfileComponent],
  providers: [AuthService, UserService]
})
export class ProfileModule {}
