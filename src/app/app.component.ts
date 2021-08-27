import { Component } from '@angular/core';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

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


  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.Movies, event.previousIndex, event.currentIndex);
    console.log("Movies: ", this.Movies)
  }
}
