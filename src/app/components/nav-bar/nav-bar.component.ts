import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductsService } from 'src/app/services/products.service';
import { AppDataState, DataStateEnum } from 'src/app/state/product.state';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  products$:Observable<AppDataState<Product[]>> | null = null;
  readonly DataStateEnum = DataStateEnum;

  ngOnInit(): void {
      
  }

  constructor(private productService:ProductsService, private router:Router) {}

  onSearch(dataForm: any): void {
    this.productService.searchProducts(dataForm.keyword);
    //this.router.navigate(['/'], { queryParams: { search: dataForm.keyword }});
    /*this.products$ = this.productService.searchProducts(dataForm.keyword).pipe(
      map(data => {
        console.log(data);
        return ({ dataState: DataStateEnum.LOADED, data:data})
      }),
      startWith({dataState: DataStateEnum.LOADING}),
      catchError(err => of({ dataState: DataStateEnum.ERROR, errorMessage: err.message}))
    );*/
  }

  navigateToAddProduct(): void {
    this.router.navigate(['/add-product']);
  }
}
