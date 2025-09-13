import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService, ProductDto } from '../../services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-product',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-product.html',
  styleUrls: ['./edit-product.css']
})
export class EditProduct implements OnInit {
  id!: number;
  name: string = '';
  price: number | null = null;
  selectedFile: File | null = null;
  imageUrl: string = '';

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(this.id).subscribe(product => {
      this.name = product.name;
      this.price = product.price;
      this.imageUrl = product.imageUrl;
    });
  }

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  onSubmit() {
    if (!this.name || !this.price) {
      alert('Name and price are required!');
      return;
    }
    const formData = new FormData();
    formData.append('Name', this.name);
    formData.append('Price', this.price.toString());
    if (this.selectedFile) {
      formData.append('ImageFile', this.selectedFile);
    }
    this.productService.updateProduct(this.id, formData).subscribe({
      next: () => {
        alert('Product updated successfully!');
        this.router.navigate(['/products']);
      },
      error: (err) => {
        console.error('Error:', err);
        alert('Failed to update product');
      }
    });
  }
}
