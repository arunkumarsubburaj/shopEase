import { Component, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';

export enum Theme {
  'Light' = 'light',
  'Dark' = 'dark',
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'ShopEase';
  theme: Theme = Theme.Light;
  rootEle!: HTMLDivElement;
  @ViewChild('themeEleRef') themeEleRef!: ElementRef;
  constructor(router: Router, element: ElementRef) {
    this.rootEle = element.nativeElement;
    router.events
      .pipe(filter((e) => e instanceof NavigationStart))
      .subscribe((e) => {
        const menuIcon = document.getElementById('menu-icon') as HTMLDivElement;
        menuIcon.classList.remove('show');
        const navList = document.querySelector('.nav-list') as HTMLElement;
        navList.classList.remove('show');
      });
  }
  ngAfterViewInit() {}
  toggleIcon() {
    (document.getElementById('menu-icon') as HTMLDivElement).classList.toggle(
      'show'
    );
    const navList = document.querySelector('.nav-list') as HTMLElement;
    navList.classList.toggle('show');
  }
  toggleTheme() {
    const themeEle = this.themeEleRef.nativeElement as HTMLDivElement;
    this.theme = this.theme == Theme.Light ? Theme.Dark : Theme.Light;
    if (this.theme == Theme.Light) {
      themeEle.classList.remove('dark');
      document.querySelector('html')?.classList.add('light-theme');
      document.querySelector('html')?.classList.remove('dark-theme');
    } else {
      themeEle.classList.add('dark');
      document.querySelector('html')?.classList.remove('light-theme');
      document.querySelector('html')?.classList.add('dark-theme');
    }
  }
}
