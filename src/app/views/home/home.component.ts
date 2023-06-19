import cli from '@angular/cli';
import { Component , OnInit} from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
interface Product {
  id: number;
  cantidad_stock: number;
  nombre: string;
  precio_venta: number;
  cantidad: number;
}
interface Client{
  id: number;
  nombre: string;
}
interface Venta{
  cliente_id: number;
  total_venta: number;
  departamento: string;
  notas:string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  buscar: any;
  datos: any = [];
  total: number = 0;
  products: Product[
  ] = [];
  clientes: Client[] =[];
  ventas: any;
  clienteselect: any;
  selectedProducts: Product[] = [];
  constructor(private router:Router,public homeService:HomeService){}
  ngOnInit(){
    this.homeService.getProductos().subscribe(
      (response) => {
        this.datos = response;
         for(var i = 0; i < this.datos.strAnswer.length; i++){
          const product: Product = {
            id: this.datos.strAnswer[i].id,
            cantidad_stock: this.datos.strAnswer[i].cantidad_stock,
            nombre: this.datos.strAnswer[i].nombre,
            precio_venta: this.datos.strAnswer[i].precio_venta,
            cantidad: 0 // Inicializar la cantidad en 0
          };
          this.products.push(product);       
        }
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    )
    this.homeService.getClientes().subscribe(
      (response) => {
        this.datos = response;

        for(var i = 0; i < this.datos.strAnswer.length; i++){
          this.clientes.push(this.datos.strAnswer[i]);
        }
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    )
  }
  getProducts(venta: any): void{
    this.ventas= venta
    for (let i = 0; i < this.selectedProducts.length; i++) {
      const datadet: any = {
        venta_id: this.ventas,
        producto_id: this.selectedProducts[i].id,
        cantidad: this.selectedProducts[i].cantidad,
        precio_unitario: this.selectedProducts[i].precio_venta,
        metodo_pago: "Tarjeta",
      }; 
      this.homeService.insertdetalleventa(datadet).subscribe((res:any) => {
        if(res.exito === true){
          Swal.fire('Opreacion exitosa','Venta Realizada.', 'success')
          this.router.navigateByUrl('home');
        }else{
          Swal.fire('Error','No se pudo Realizar la Venta.','error')
          this.router.navigateByUrl('home');
        }
      })
    }
    this.router.navigateByUrl('read');
  }
  fnCompra(cliente: any): void{
    if(this.total == 0){
      Swal.fire({
        text: 'La acción no puede ser procesada con la cantidad de 0',
        title: 'Cancelado',
        icon: 'error',
        confirmButtonColor: '#00BEB5',
        }
      );
    }else{
      this.clienteselect = cliente;
        if(this.clienteselect == '0'){
          Swal.fire({
            text: 'La acción no puede ser procesada  sin un cliente',
            title: 'Cancelado',
            icon: 'error',
            confirmButtonColor: '#00BEB5',
            }
          );
          this.router.navigateByUrl('addclient');
        }else{
          const data: any = {
            cliente_id: cliente,
            total_venta: this.total,
            departamento: "Ventas",
            notas: "",
          };
          this.homeService.insertventa(data).subscribe((res:any) => {
            if(res.exito === true){
              Swal.fire('Opreacion exitosa','Venta Realizada.', 'success').then(() =>{
                this.router.navigateByUrl('home');
              })
            }else{
              Swal.fire('Error','No se pudo Realizar la Venta.','error').then(() =>{
                this.router.navigateByUrl('home');
              })
            }
          })
          this.homeService.getVenta().subscribe(
            (response) => {
              this.datos = response;
              for(var i = 0; i < this.datos.strAnswer.length; i++){
                this.ventas = this.datos.strAnswer[i].id
              }
              this.getProducts(this.ventas)
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
      this.total += product.precio_venta;
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
        this.total += this.selectedProducts[i].precio_venta * this.selectedProducts[i].cantidad;
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
      this.total += this.selectedProducts[i].precio_venta * this.selectedProducts[i].cantidad;
    }
  }
  
}
