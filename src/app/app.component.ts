import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ThemeService } from './shared/services/theme.service';
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
  ngOnInit(): void {
      
  }
  constructor(
    public themeService: ThemeService
  ) {}
  switchTheme(){
    this.themeService.toggleTheme();
  }
}
