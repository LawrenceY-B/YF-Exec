import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
interface Activity {
  date: Date | null;
  activity: string;
  leaders: string[];
  synopsis: string;
}
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'YF-Exec';
  weeks : Date[]=[];

  activities: Activity[] = [
   
  ];
  ngOnInit(): void {
    const start = new Date('2023-07-01');
    const end = new Date('2023-12-31');

    const DAY = 24 * 60 * 60 * 1000;

    const endValue = end.valueOf();
    for (
      let newStart = start.valueOf();
      newStart <= endValue;
      newStart += DAY * 7
    ) {
      const days: Date[] = [];
      for (let d = newStart; d < newStart + 7 * DAY; d += DAY) {
        const currentDay = new Date(d);
        if (currentDay.getDay() === 0) {
          // 0 corresponds to Sunday
          days.push(currentDay);
        }
      }
      days.map(day => this.weeks.push(day));
      
    }
    this.activities.map((activity, index) => {
      activity.date = this.weeks[index];

    });
    console.log(this.weeks)
    console.log(this.activities);
    
    localStorage.getItem('ButtonCatgory');
   
      let temp = localStorage.getItem('ButtonCatgory');
      if (temp) {
        this.ButtonCatgory = JSON.parse(temp);
      } else {
        this.ButtonCatgory = [];
      }
    
    
  }
  constructor(
    private formBuilder: NonNullableFormBuilder
  ) {}
  ButtonCatgory: string[]=[]
  TableFormBuilder=this.formBuilder.group({
    Date: ['', Validators.required],
    Activity: ['', Validators.required],
    Leaders: ['', Validators.required],
    Synopsis: ['', Validators.required],
  })
  ActivityFormBuilder= this.formBuilder.group({
    Activity: ['', Validators.required],

  })

  onKeyDown(event: any) {
    // You can access the content and perform actions here
    event.preventDefault();
    const content = event.target.textContent;
    console.log(content);
  }

  
  adjustTextareaHeight(event: any) {
    const textarea = event.target;
    textarea.style.height = 'auto';
    textarea.style.height = `${textarea.scrollHeight}px`;
    textarea.style.padding = '3px';
  }
  startDrag(event: any) {
    event.dataTransfer.setData('text/plain', event.target.textContent);
  }
  
  allowDrop(event: DragEvent) {
    event.preventDefault();
  }
  
  drop(event: DragEvent, x:HTMLInputElement) {
    event.preventDefault();
    const data = event.dataTransfer?.getData('text/plain') as string;
    x.value = data;
    console.log(`Dropped: ${data}`);

    // You can update your 'activities' array or perform any other actions with the dropped data.
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
  removeCategory(category:string){
    this.ButtonCatgory = this.ButtonCatgory.filter((item) => item !== category);
    localStorage.setItem('ButtonCatgory', JSON.stringify(this.ButtonCatgory));
  }
}
