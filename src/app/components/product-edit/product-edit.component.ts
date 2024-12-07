import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { Product } from 'src/app/model/product.model';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  product: Product = {
    id: 0,
    name: '',
    image: '',
    price: 0,
    quantity: 0,
  };
  updateForm: any;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.params['id'];
    this.productService.getProduct(id).subscribe((data) => {
      this.product = data;
    });
  }

  updateProduct(): void {
    console.log('Update button clicked'); // Debugging
    this.productService.updateProduct(this.product).subscribe({
      next: (updatedProduct) => {
        console.log('Product updated:', updatedProduct);
        this.router.navigate(['/products']); // Redirect
      },
      error: (err) => {
        console.error('Error updating product:', err);
        alert('Failed to update product. Please try again.');
      }
    });
  }

  cancelUpdate() {

  }
}
