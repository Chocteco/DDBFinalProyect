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
@Component({
  selector: 'app-delete',
  templateUrl: './delete.component.html',
  styleUrls: ['./delete.component.css']
})
export class DeleteComponent implements OnInit{
  products: Product[] = [];
  datos: any = [];
  id : any;
  constructor(public homeService:HomeService,public router:Router){}
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
  regresar() {
    this.router.navigateByUrl('');
  }
  envio(id:any){
    this.id = id
    this.homeService.deleteProducto(id).subscribe((res:any) => {
      if(res.exito === true){
          Swal.fire('Opreacion exitosa','Producto Eliminado.', 'success')
          this.regresar()
        }else{
          Swal.fire('Error','No se pudo agregar cliente.','error')
        }
    })
    
  }
}
