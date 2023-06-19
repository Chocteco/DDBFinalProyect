import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './views/header/header.component';
import { FooterComponent } from './views/footer/footer.component';
import { HomeComponent } from './views/home/home.component';
import { CreateComponent } from './views/CRUD/create/create.component';
import { ReadComponent } from './views/CRUD/read/read.component';
import { UpdateComponent } from './views/CRUD/update/update.component';
import { DeleteComponent } from './views/CRUD/delete/delete.component';
import { LendingComponent } from './views/lending/lending.component';
import { HttpClientModule } from '@angular/common/http';
import { AddClientComponent } from './views/add-client/add-client.component';
import { DatePipe } from '@angular/common';
import { AddproviderComponent } from './views/addprovider/addprovider.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CreateComponent,
    ReadComponent,
    UpdateComponent,
    DeleteComponent,
    LendingComponent,
    AddClientComponent,
    AddproviderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
