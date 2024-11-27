import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  allProducts: Product[] = [];
  selectedProduct: Product | null = null;
  idTodelete: number = 0;

  ngOnInit(): void {
      this.loadProducts();
      this.productService.filteredProducts$.subscribe((products) => {
        this.allProducts = products.length > 0 ? products : this.allProducts;
      });
  }

  constructor(private productService: ProductsService, private router: Router, private route: ActivatedRoute) {}

  loadProducts(): void {
    this.productService.getAllProducts().subscribe((products) => {
      this.allProducts = products.filter( p => p.quantity > 0);
    })
  }

  openModal(p: Product): void {
    this.selectedProduct = p;
    ($('#productModal') as any).modal('show');
  }

  closeModal(): void {
    ($('#productModal') as any).modal('hide');
  }

  deleteProduct(p: Product) {
    let v = confirm("Etes vous sûre ?");
    if (v) {
      this.productService.deleteProduct(p).subscribe({
        next: () => {
          ($('#productModal') as any).modal('hide');
          this.loadProducts();
        }
      })
    }
  }

  editProduct(p: Product): void {
    this.router.navigateByUrl("/edit-product/"+p.id);
  }

}
