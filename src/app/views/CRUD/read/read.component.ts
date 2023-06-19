import { Component, OnInit } from '@angular/core';
import { HomeService } from 'src/app/services/home.service';
import { DatePipe } from '@angular/common';
interface Product {
  id: number;
  cantidad_stock: number;
  nombre: string;
  precio_venta: number;
  descripcion: string;
  precio_compra: number;
  fecha_creacion: string | null;
}
@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit{
  products: Product[] = [];
  datos: any = [];
  constructor(public homeService:HomeService,private datePipe: DatePipe){}
  ngOnInit(): void {
    this.homeService.getProductos().subscribe(
      (response) => {
        this.datos = response;
         for(var i = 0; i < this.datos.strAnswer.length; i++){
          const product: Product = {
            id: this.datos.strAnswer[i].id,
            precio_venta: this.datos.strAnswer[i].precio_venta,
            nombre: this.datos.strAnswer[i].nombre,
            descripcion: this.datos.strAnswer[i].descripcion,
            precio_compra: this.datos.strAnswer[i].precio_compra,
            cantidad_stock: this.datos.strAnswer[i].cantidad_stock,
            fecha_creacion: this.datePipe.transform(this.datos.strAnswer[i].fecha_creacion, 'yyyy-MM-dd'),
          };
          this.products.push(product);       
        }
      },
      (error) => {
        console.error('Error al obtener los datos: ', error);
      }
    )
  }
}
