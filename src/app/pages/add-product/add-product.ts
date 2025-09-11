import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-product.html',
  styleUrls: ['./add-product.css'] // ✅ unchanged
})
export class AddProduct {
  name = '';
  price: number | null = null;
  selectedFile: File | null = null;

  constructor(private productService: ProductService, private router: Router) {}

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onSubmit() {
    if (!this.name || !this.price) {
      alert('Please fill all fields.');
      return;
    }

    const formData = new FormData();
    formData.append('name', this.name);
    formData.append('price', String(this.price));

    // ⚡ Key change here: must match backend DTO property name
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile);
    }

    this.productService.createProduct(formData).subscribe({
      next: () => {
        alert('Product added successfully');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Create product error:', err);
        alert('Failed to add product');
      }
    });
  }
}
