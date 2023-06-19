import cli from '@angular/cli';
import { Component , OnInit} from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
interface Product {
  id: number;
  cantidad_min: number;
  nombre: string;
  precio_compra: number;
  cantidad: number;
}
interface Provideer{
  id: number;
  nombre: string;
}
@Component({
  selector: 'app-lending',
  templateUrl: './lending.component.html',
  styleUrls: ['./lending.component.css']
})
export class LendingComponent implements OnInit{
  buscar: any;
  datos: any = [];
  total: number = 0;
  products: Product[
  ] = [];
  provedores: Provideer[] =[];
  compras: any;
  provideerselect: any;
  selectedProducts: Product[] = [];
  constructor(private router:Router,public homeService:HomeService){}
  ngOnInit(){
    this.homeService.getProductos().subscribe(
      (response) => {
        this.datos = response;
         for(var i = 0; i < this.datos.strAnswer.length; i++){
          const product: Product = {
            id: this.datos.strAnswer[i].id,
            cantidad_min: this.datos.strAnswer[i].cantidad_stock,
            nombre: this.datos.strAnswer[i].nombre,
            precio_compra: this.datos.strAnswer[i].precio_compra,
            cantidad: 0 // Inicializar la cantidad en 0
          };
          this.products.push(product);       
        }
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    )
    this.homeService.getProveedores().subscribe(
      (response) => {
        this.datos = response;

        for(var i = 0; i < this.datos.strAnswer.length; i++){
          this.provedores.push(this.datos.strAnswer[i]);
        }
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    )
  }
  
  getProducts(compra: any): void{
    this.compras= compra
    for (let i = 0; i < this.selectedProducts.length; i++) {
      const datadet: any = {
        compra_id: this.compras,
        producto_id: this.selectedProducts[i].id,
        cantidad: this.selectedProducts[i].cantidad,
        precio_unitario: this.selectedProducts[i].precio_compra,
        metodo_pago: "Tarjeta",
      }; 
      this.homeService.insertdetallecompra(datadet).subscribe((res:any) => {
        if(res.exito === true){
          Swal.fire('Opreacion exitosa','Compra Realizada.', 'success')
          this.router.navigateByUrl('home');
        }else{
          Swal.fire('Error','No se pudo Realizar la compra.','error')
          this.router.navigateByUrl('home');
        }
      })
    }
    this.router.navigateByUrl('read');
  }
  fnventa(provideer: any): void{
    if(this.total == 0){
      Swal.fire({
        text: 'La acción no puede ser procesada con la cantidad de 0',
        title: 'Cancelado',
        icon: 'error',
        confirmButtonColor: '#00BEB5',
        }
      );
    }else{
      this.provideerselect = provideer;
        if(this.provideerselect == '0'){
          Swal.fire({
            text: 'La acción no puede ser procesada  sin un proveedor',
            title: 'Cancelado',
            icon: 'error',
            confirmButtonColor: '#00BEB5',
            }
          );
          this.router.navigateByUrl('addprovideer');
        }else{
          const data: any = {
            proveedor_id: provideer,
            total_compra: this.total,
            departamento: "Compras",
            notas: "",
          };
          this.homeService.insertcompra(data).subscribe((res:any) => {
            if(res.exito === true){
              Swal.fire('Opreacion exitosa','Compra Realizada.', 'success').then(() =>{
                this.router.navigateByUrl('home');
              })
            }else{
              Swal.fire('Error','No se pudo Realizar la Compra.','error').then(() =>{
                this.router.navigateByUrl('home');
              })
            }
          })
          this.homeService.getCompra().subscribe(
            (response) => {
              this.datos = response;
              for(var i = 0; i < this.datos.strAnswer.length; i++){
                this.compras = this.datos.strAnswer[i].id
              }
              this.getProducts(this.compras)
            },
            (error) => {
              console.error('Error al obtener los datos: ', error);
            }
          )
        }
    }
  }
  addToCart(product: Product) {
    let productExists = false;

    if (this.selectedProducts.length == 0) {
      product.cantidad = 0;
      this.selectedProducts.push(product);
      product.cantidad++;
      this.total += product.precio_compra;
    } else {
      this.buscar = product.id;
      for (let i = 0; i < this.selectedProducts.length; i++) {
        if (this.selectedProducts[i].id == this.buscar) {
          this.selectedProducts[i].cantidad++;
          productExists = true;
          break;
        }
      }

      if (!productExists) {
        product.cantidad = 0; 
        this.selectedProducts.push(product);
        product.cantidad++;
      }

      this.total = 0;
      for (let i = 0; i < this.selectedProducts.length; i++) {
        this.total += this.selectedProducts[i].precio_compra * this.selectedProducts[i].cantidad;
      }
    }
  }
  deleteCart(id: number){
    let productIndex = -1;
  this.buscar = id;

  for (let i = 0; i < this.selectedProducts.length; i++) {
    if (this.selectedProducts[i].id === this.buscar) {
      this.selectedProducts[i].cantidad--;
      productIndex = i;
      break;
    }
  }

  if (productIndex !== -1) {
    if (this.selectedProducts.length === 0) {
       this.selectedProducts[productIndex].cantidad = 0; // Inicializar la cantidad en 0
    }
      this.selectedProducts.splice(productIndex, 1);
  }
    this.total = 0;

    for (let i = 0; i < this.selectedProducts.length; i++) {
      this.total += this.selectedProducts[i].precio_compra * this.selectedProducts[i].cantidad;
    }
  }
}
