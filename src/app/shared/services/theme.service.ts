import { Injectable } from '@angular/core';
const THEME_KEY = 'user-theme';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  isDarkTheme: boolean = false;

  constructor() {
    // Initialize the theme based on the user's preference
    this.detectColorScheme();
    this.loadThemePreference();

  }

  detectColorScheme() {
    const darkModeMediaQuery = window.matchMedia(
      '(prefers-color-scheme: dark)'
    );

    if (darkModeMediaQuery.matches) {
      this.isDarkTheme = true;
    }
  }

  private loadThemePreference() {
    const storedTheme = localStorage.getItem(THEME_KEY);

    if (storedTheme) {
      this.isDarkTheme = JSON.parse(storedTheme);
    }
  }

  private saveThemePreference() {
    // Save the user's theme preference to localStorage
    localStorage.setItem(THEME_KEY, JSON.stringify(this.isDarkTheme));
  }

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    this.saveThemePreference();
  }
}
