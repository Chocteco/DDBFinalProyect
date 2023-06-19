import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { Router } from '@angular/router';
import { FormGroup,FormControl,Validators } from '@angular/forms';
import Swal from 'sweetalert2';
interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  boton: string;
}
interface Categoria{
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit{
  products: Product[] = [];
  datos: any = [];
  id : any;
  categoria: Categoria[] =[];
  nombre: any;
  productoForm: FormGroup;
  constructor(public homeService:HomeService,public router:Router){
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
  ngOnInit(): void {
    this.homeService.getProductos().subscribe(
      (response) => {
        this.datos = response;
         for(var i = 0; i < this.datos.strAnswer.length; i++){
          const product: Product = {
            id: this.datos.strAnswer[i].id,
            nombre: this.datos.strAnswer[i].nombre,
            descripcion: this.datos.strAnswer[i].descripcion,
            boton: '',
          };
          this.products.push(product);       
        }
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    )
  }
  getProduct(id:any){
    this.categoria = [];
    this.id = id
    this.homeService.getProducto(this.id).subscribe(
      (response) => {
        this.datos = response;
        console.log(this.datos)
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    )
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
  envio(id:any){
    this.id = id
    let data = JSON.parse(JSON.stringify(this.productoForm.value))
    this.homeService.updateProducto(id,data).subscribe((res:any) => {
      if(res.exito === true){
          Swal.fire('Opreacion exitosa','Cliente actualizado.', 'success')
          this.regresar()
        }else{
          Swal.fire('Error','No se pudo agregar cliente.','error')
        }
    })
    
  }
}
