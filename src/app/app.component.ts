import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

import { HttpClient } from '@angular/common/http';
import { FormGroup, FormControl, Validators} from '@angular/forms'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  images : string[] = [];
  myForm = new FormGroup({
    name: new FormControl('', [Validators.required]),
    file: new FormControl('', [Validators.required]),
    fileSource: new FormControl('', [Validators.required])
  });

  constructor(private http: HttpClient) { }

  get formValue(){
    return this.myForm.controls;
  }

  onFileChange(event:any) {
    if (event.target.files && event.target.files[0]) {
      var filesAmount = event.target.files.length;
      for (let i = 0; i < filesAmount; i++) {
        var reader = new FileReader();
        reader.onload = (event:any) => {
          // Push Base64 string
          this.images.push(event.target.result);
          this.patchValues();
        }
        reader.readAsDataURL(event.target.files[i]);
      }
    }
  }

  // Patch form Values
  patchValues(){
    this.myForm.patchValue({
      fileSource: this.images
    });
    console.log(this.images);
  }

  // Remove Image
  removeImage(url:any){
    // console.log(this.images,url);
    this.images = this.images.filter(img => (img != url));
    this.patchValues();
  }

  // Submit Form Data
  submit(){
    // this.http.post('http://localhost:8005/upload.php', this.myForm.value)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   })
    console.log(this.myForm.value);

  }

// Дальше Drag-drop ...

  // Переделал IN
  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.images, event.previousIndex, event.currentIndex);
    console.log("images: ", this.images)
  }

  showUrl(url: any): void {
    console.log("Url::: ", url)
  }

  // Переделал OUT


  showObject(movieName: any): void {
    console.log("movieName::: ", movieName)
  }

  Movies = [
    {
      name: "Иван",
      age: 23
    },
    {
      name: "Фёдор",
      age: 16
    },
    {
      name: "Антон",
      age: 11
    },
    {
      name: "Ольга",
      age: 15
    }
  ];


  // drop(event: CdkDragDrop<string[]>) {
  //   moveItemInArray(this.Movies, event.previousIndex, event.currentIndex);
  //   console.log("Movies: ", this.Movies)
  // }
}
