import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm : FormGroup;
  estadoFormulario:string ="Agregar";
  constructor(private fb:FormBuilder , private categoryServices : CategoryService , private dialogRef: MatDialogRef<NewCategoryComponent>, 
    @Inject(MAT_DIALOG_DATA )public data: any) {

    this.estadoFormulario="Agregar";
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description:['',Validators.required]
    });
    if (data != null){
      this.updateForm(data);
      this.estadoFormulario ="Actualizar";
    }

   }

  ngOnInit(): void {
  }

  onSave(){
    let data = {
      name: this.categoryForm.get('name')?.value,
      description:this.categoryForm.get('description')?.value
    }

    if(this.data != null){
      console.log(this.data.id)
      this.categoryServices.updateCategory(data , this.data.id)
        .subscribe((data:any)=>{
          this.dialogRef.close(1);
         }, (error:any) => {
          this.dialogRef.close(2);
        })
    }else{

      this.categoryServices.saveCategory(data)
        .subscribe(data => {
          console.log(data);
          this.dialogRef.close(1)

        }, (error:any)=>{
          this.dialogRef.close(2)
        })

    }

    
  }

  onCancel(){
    this.dialogRef.close(3);
  }

  updateForm(data:any){
    this.categoryForm = this.fb.group({
      name: [data.name, Validators.required],
      description:[data.description,Validators.required]
    });
  }
}
