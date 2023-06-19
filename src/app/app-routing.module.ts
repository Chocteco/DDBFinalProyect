import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './views/home/home.component';
import { CreateComponent } from './views/CRUD/create/create.component';
import { ReadComponent } from './views/CRUD/read/read.component';
import { UpdateComponent } from './views/CRUD/update/update.component';
import { DeleteComponent } from './views/CRUD/delete/delete.component';
import { LendingComponent } from './views/lending/lending.component';
import { AddClientComponent } from './views/add-client/add-client.component';
import { AddproviderComponent } from './views/addprovider/addprovider.component';
const routes: Routes = [
  {path: '',component:HomeComponent},
  {path: 'home',component:HomeComponent},
  {path: 'create',component:CreateComponent},
  {path: 'read',component:ReadComponent},
  {path: 'update',component:UpdateComponent},
  {path: 'delete',component:DeleteComponent},
  {path: 'lending',component:LendingComponent},
  {path: 'addclient',component:AddClientComponent},
  {path: 'addprovideer',component:AddproviderComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
