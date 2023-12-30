import { Component, OnInit } from '@angular/core';
import { FormArray, FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Activity } from 'src/app/shared/models/activity.model';
import { ThemeService } from 'src/app/shared/services/theme.service';

@Component({
  selector: 'app-newplan',
  templateUrl: './newplan.component.html',
  styleUrls: ['./newplan.component.scss']
})

export class NewplanComponent implements OnInit {

  constructor(
    private formBuilder: NonNullableFormBuilder,
    private router: Router,
  ) { }
  ngOnInit(): void {
      
  }
  newPlan= this.formBuilder.group({
    Year:['', Validators.required],
    Theme:['', Validators.required],
    Title:['', Validators.required],
    Verses:this.formBuilder.array([this.createVerse()]),
    ProgramStart:['', Validators.required,],
    ProgramEnd:['', Validators.required],
  })
  get verseForms() {
    return (this.newPlan.get('Verses') as FormArray);
  }
  createVerse(): FormGroup {
    return this.formBuilder.group({
      Verses: ['', Validators.required]
    });
  }

  addVerse() {
    this.verseForms.push(this.createVerse());
  }
  Submit(){
    console.log(this.newPlan);
    console.log(this.newPlan.value);
    localStorage.setItem('planner', JSON.stringify(this.newPlan.value));
    this.router.navigate(['/dashboard/planner']);
  }
  Cancel(){
    this.newPlan.reset();

  }

  // constructor(
  //   private formBuilder: NonNullableFormBuilder,
  //   public themeService: ThemeService
  // ) {}
  // ButtonCatgory: string[]=[]
  // TableFormBuilder=this.formBuilder.group({
  //   Date: ['', Validators.required],
  //   Activity: ['', Validators.required],
  //   Leaders: ['', Validators.required],
  //   Synopsis: ['', Validators.required],
  // })
  // ActivityFormBuilder= this.formBuilder.group({
  //   Activity: ['', Validators.required],

  // })

  // onKeyDown(event: any) {
  //   // You can access the content and perform actions here
  //   event.preventDefault();
  //   const content = event.target.textContent;
  //   console.log(content);
  // }

  
  // adjustTextareaHeight(event: any) {
  //   const textarea = event.target;
  //   textarea.style.height = 'auto';
  //   textarea.style.height = `${textarea.scrollHeight}px`;
  //   textarea.style.padding = '3px';
  // }
  // startDrag(event: any) {
  //   event.dataTransfer.setData('text/plain', event.target.textContent);
  // }
  
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
  // Submit() {
  //   const data = this.ActivityFormBuilder.value.Activity as string;
  //   console.log(data);

  //   let temp = localStorage.getItem('ButtonCatgory');
  //   if (temp) {
  //     this.ButtonCatgory = JSON.parse(temp);
  //   }

  //   this.ButtonCatgory.push(data); // Add the new item to the ButtonCatgory array

  //   localStorage.setItem('ButtonCatgory', JSON.stringify(this.ButtonCatgory));

  //   this.ActivityFormBuilder.reset();
  // }
  // removeCategory(category:string){
  //   this.ButtonCatgory = this.ButtonCatgory.filter((item) => item !== category);
  //   localStorage.setItem('ButtonCatgory', JSON.stringify(this.ButtonCatgory));
  // }
}

