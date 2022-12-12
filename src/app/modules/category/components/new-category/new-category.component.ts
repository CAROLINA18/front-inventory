import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CategoryService } from 'src/app/modules/shared/services/category.service';
import { threadId } from 'worker_threads';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  public categoryForm : FormGroup;
  constructor(private fb:FormBuilder , private categoryServices : CategoryService , private dialogRef: MatDialogRef<NewCategoryComponent>) {
    this.categoryForm = this.fb.group({
      name: ['', Validators.required],
      description:['',Validators.required]
    });
   }

  ngOnInit(): void {
  }

  onSave(){
    let data = {
      name: this.categoryForm.get('name')?.value,
      description:this.categoryForm.get('description')?.value
    }
    this.categoryServices.saveCategory(data)
        .subscribe(data => {
          console.log(data);
          this.dialogRef.close(1)

        }, (error:any)=>{
          this.dialogRef.close(2)
        })
  }

  onCancel(){
    this.dialogRef.close(3);
  }
}
