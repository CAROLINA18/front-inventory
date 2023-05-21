import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ProductService } from '../../shared/services/product.service';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {



  constructor(private productService: ProductService , private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.getProducts();
  }

  displayedColumns: string[] = ['id','name','price','quantity','category','picture','actions'];
  dataSource = new MatTableDataSource<ProductElement>()

  @ViewChild(MatPaginator)
  paginator! : MatPaginator

  getProducts(){
    this.productService.getProducts()
      .subscribe( (data:any) =>{
          console.log(data);
          this.processProductResponse(data)
          
      },(error:any) =>{
        console.log(error)  
      } )
  }

  processProductResponse(resp:any){
    const dateProduct:ProductElement[] =[];
    if(resp.metadata[0].code == "00"){
      let listCProduct = resp.product.products;
      listCProduct.forEach((element: ProductElement) => {
        element.category =element.category.name
        element.picture = this.sanitizer.bypassSecurityTrustResourceUrl(`data:image/png;base64, ${element.picture}`);
        dateProduct.push(element);
      });
      this.dataSource=new MatTableDataSource<ProductElement>(dateProduct)
      this.dataSource.paginator=this.paginator
    }
  }

}

export interface ProductElement{
  id:number;
  name:string;
  price: number;
  quantity:number
  category: any;
  picture:any;
}