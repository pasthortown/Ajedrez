import { FormsModule } from "@angular/forms";
import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";

import { BoardRoutingModule } from "./board-routing.module";
import { BoardComponent } from "./board.component";

@NgModule({
  imports: [CommonModule, BoardRoutingModule, FormsModule],
  declarations: [BoardComponent]
})
export class BoardModule {}
