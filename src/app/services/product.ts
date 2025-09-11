import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';  // 👈 add this

export interface ProductDto {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:5027/api/products'; 
  private hostUrl = 'http://localhost:5027'; // 👈 backend root

  constructor(private http: HttpClient) {}

  // Get all products and fix image URL
  getProducts(): Observable<ProductDto[]> {
    return this.http.get<ProductDto[]>(this.baseUrl).pipe(
      map(products =>
        products.map(p => ({
          ...p,
          imageUrl: p.imageUrl.startsWith('http')
            ? p.imageUrl
            : `${this.hostUrl}${p.imageUrl}`
        }))
      )
    );
  }

  // Create product (with image upload)
  createProduct(formData: FormData): Observable<ProductDto> {
    return this.http.post<ProductDto>(this.baseUrl, formData);
  }

  // Update existing product (with image upload if provided)
  updateProduct(id: number, formData: FormData): Observable<ProductDto> {
    return this.http.put<ProductDto>(`${this.baseUrl}/${id}`, formData);
  }

  // Get a single product by ID
  getProduct(id: number): Observable<ProductDto> {
    return this.http.get<ProductDto>(`${this.baseUrl}/${id}`);
  }

  // Delete product by ID
  deleteProduct(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}






// import { Injectable } from '@angular/core';
// import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';

// export interface ProductDto {
//   id: number;
//   name: string;
//   price: number;
//   imageUrl: string;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class ProductService {
//   private baseUrl = 'http://localhost:5027/api/products'; 

//   constructor(private http: HttpClient) {}

//   // Get all products
//   getProducts(): Observable<ProductDto[]> {
//     return this.http.get<ProductDto[]>(this.baseUrl);
//   }

//   // Create product (with image upload)
//   createProduct(formData: FormData): Observable<ProductDto> {
//     return this.http.post<ProductDto>(this.baseUrl, formData);
//   }

//   // Update existing product (with image upload if provided)
//   updateProduct(id: number, formData: FormData): Observable<ProductDto> {
//     return this.http.put<ProductDto>(`${this.baseUrl}/${id}`, formData);
//   }
// }
