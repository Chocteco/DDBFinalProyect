import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  constructor(public http: HttpClient) {}
  private apiUrl = 'http://127.0.0.1:5000';
  getProductos() {
    const url = `${this.apiUrl}/productos`;
    return this.http.get(url);
  }
  getClientes(){
    const url = `${this.apiUrl}/clientes`;
    return this.http.get(url);
  }
  insertcompra(compra: any){
    const url = `${this.apiUrl}/compra`;
    return this.http.post(url,compra);
  }
  insertcliente(cliente:any) {
    const url = `${this.apiUrl}/clientes`;
    return this.http.post(url, cliente);
  }
  insertproveedor(proveedor:any) {
    const url = `${this.apiUrl}/proveedor`;
    return this.http.post(url, proveedor);
  }
  insertventa(venta:any){
    const url = `${this.apiUrl}/venta`;
    return this.http.post(url, venta);
  }
  insertdetalleventa(venta: any) {
    const url = `${this.apiUrl}/detalleventa`;
    return this.http.post(url, venta);
  }
  getVenta(){
    const url = `${this.apiUrl}/venta`;
    return this.http.get(url);
  }
  insertProducto(producto: any){
    const url = `${this.apiUrl}/productos`;
    return this.http.post(url, producto);
  }
  getCategorias(){
    const url = `${this.apiUrl}/categorias`;
    return this.http.get(url);
  }
  getProducto(id:number) {
    const url = `${this.apiUrl}/productos/`+id;
    return this.http.get(url);
  }
  updateProducto(id:number,producto: any){
    const url = `${this.apiUrl}/productos/`+id;
    return this.http.put(url, producto);
  }
  deleteProducto(id:number) {
    const url = `${this.apiUrl}/productos/`+id;
    return this.http.delete(url);
  }
  getProveedores(){
    const url = `${this.apiUrl}/proveedores`;
    return this.http.get(url);
  }
  getCompra(){
    const url = `${this.apiUrl}/compra`;
    return this.http.get(url);
  }
  insertdetallecompra(compra: any) {
    const url = `${this.apiUrl}/detallecompra`;
    return this.http.post(url, compra);
  }
}
