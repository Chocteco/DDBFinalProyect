import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductModel } from 'src/app/models/ProductModel';
import { HomeService } from 'src/app/services/home.service';
import Swal from 'sweetalert2';
interface Categoria{
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})

export class CreateComponent implements OnInit{
  categoria: Categoria[] =[];
  datos: any;
  productoForm: FormGroup;
  //datos: ProductModel;
  longitud: number=0;
  config = {
    id: 'custom',
    itemsPerPage: 25,
    currentPage: 1,
    totalItems: this.longitud
  };
  
  constructor(private router:Router,private homeService:HomeService) {
    this.productoForm = new FormGroup({
      nombre : new FormControl('',Validators.required),
      descripcion: new FormControl('',Validators.required),
      precio_venta: new FormControl('',Validators.required),
      precio_compra: new FormControl('',Validators.required),
      cantidad_stock: new FormControl('',Validators.required),
      cantidad_minima: new FormControl('',Validators.required),
      categoria_id: new FormControl('',Validators.required),
      imagen : new FormControl('',Validators.required),
    })
  }

  ngOnInit() {
    this.homeService.getCategorias().subscribe(
      (response) => {
        this.datos = response;

        for(var i = 0; i < this.datos.strAnswer.length; i++){
          this.categoria.push(this.datos.strAnswer[i]);
        }
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    )
  }

  regresar() {
    this.router.navigateByUrl('');
  }
  envio(){
    this.productoForm.markAllAsTouched()
    let data = JSON.parse(JSON.stringify(this.productoForm.value))
    console.log(data)
    if(this.productoForm.valid){
    this.homeService.insertProducto(data).subscribe((res:any) => {
      console.log(res) 
      if(res.exito === true){
          Swal.fire('Opreacion exitosa','Cliente agregado.', 'success')
          this.regresar()
        }else{
          Swal.fire('Error','No se pudo agregar cliente.','error')
        }
    })
    }else{
      Swal.fire('Error','Llene todos los campos obligatorios.','error')
    }
  }
}
