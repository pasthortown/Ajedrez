import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { LayoutComponent } from "./layout.component";

const routes: Routes = [
  {
    path: "",
    component: LayoutComponent,
    children: [
      {
        path: "",
        redirectTo: "main"
      },
      {
        path: "main",
        loadChildren: "./main/main.module#MainModule"
      },
      {
        path: "profile",
        loadChildren: "./profile/profile.module#ProfileModule"
      },
      {
        path: "blank",
        loadChildren: "./blank-page/blank-page.module#BlankPageModule"
      },
      {
        path: "board",
        loadChildren: "./board/board.module#BoardModule"
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LayoutRoutingModule {}
