import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
})
export class ActivitiesComponent implements OnInit {
  ButtonCatgory: string[] = [];
  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router
  ) {}
  ngOnInit(): void {
    const temp = localStorage.getItem('ButtonCatgory');
    if (temp) {
      this.ButtonCatgory = JSON.parse(temp);
    }
  }
  ActivityFormBuilder = this.formBuilder.group({
    Activity: ['', Validators.required],
  });
  startDrag(event: any) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
  }

  Submit() {
    const data = this.ActivityFormBuilder.value.Activity as string;
    console.log(data);

    let temp = localStorage.getItem('ButtonCatgory');
    if (temp) {
      this.ButtonCatgory = JSON.parse(temp);
    }

    this.ButtonCatgory.push(data); // Add the new item to the ButtonCatgory array

    localStorage.setItem('ButtonCatgory', JSON.stringify(this.ButtonCatgory));

    this.ActivityFormBuilder.reset();
  }
  removeCategory(category: string) {
    this.ButtonCatgory = this.ButtonCatgory.filter((item) => item !== category);
    localStorage.setItem('ButtonCatgory', JSON.stringify(this.ButtonCatgory));
  }
}

// allowDrop(event: DragEvent) {
//   event.preventDefault();
// }

// drop(event: DragEvent, x:HTMLInputElement) {
//   event.preventDefault();
//   const data = event.dataTransfer?.getData('text/plain') as string;
//   x.value = data;
//   console.log(`Dropped: ${data}`);

//   // You can update your 'activities' array or perform any other actions with the dropped data.
// }
