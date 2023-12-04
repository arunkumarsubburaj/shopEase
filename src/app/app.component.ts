import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NavigationStart,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'shopEase';
  constructor(router: Router) {
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
}
