
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HomeService } from 'src/app/services/home.service';

@Component({
  selector: 'app-addprovider',
  templateUrl: './addprovider.component.html',
  styleUrls: ['./addprovider.component.css']
})
export class AddproviderComponent {
  productoForm: FormGroup;
  //datos: ProductModel;
  longitud: number=0;
  config = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1,
    totalItems: this.longitud
  };
  constructor(private router:Router, private homeservice: HomeService) {
    this.productoForm = new FormGroup({
      nombre : new FormControl('',Validators.required),
      direccion: new FormControl('',Validators.required),
      telefono : new FormControl('',Validators.required),
      correo_electronico: new FormControl('',Validators.required)
    })
  }
  regresar() {
    this.router.navigateByUrl('lending');
  }
  envio(){
    this.productoForm.markAllAsTouched()
    let data = JSON.parse(JSON.stringify(this.productoForm.value))
    if(this.productoForm.valid){
      console.log(data);
    
      this.homeservice.insertproveedor(data).subscribe((res:any) => {
        if(res.exito === true){
          Swal.fire('Opreacion exitosa','Proveedor agregado.', 'success')
          this.regresar()
        }else{
          Swal.fire('Error','No se pudo agregar Proveedor.','error')
        }
      })
    }else{
      Swal.fire('Error','Llene todos los campos obligatorios.','error')
    }
  }
}
