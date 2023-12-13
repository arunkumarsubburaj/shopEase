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
import { CartServiceService } from './cart-service.service';

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
  cartCount: number = 0;
  constructor(
    router: Router,
    element: ElementRef,
    public cartService: CartServiceService
  ) {
    this.rootEle = element.nativeElement;

    // Listen to router events
    router.events
      // Filter the events to only include NavigationStart
      .pipe(filter((e) => e instanceof NavigationStart))
      // Subscribe to the router events
      .subscribe((e) => {
        // Get the menu icon element
        const menuIcon = document.getElementById('menu-icon') as HTMLDivElement;
        // Remove the show class from the menu icon
        menuIcon.classList.remove('show');
        // Get the navigation list element
        const navList = document.querySelector('.nav-list') as HTMLElement;
        // Remove the show class from the navigation list
        navList.classList.remove('show');
      });
  }
  ngOnInit() {}
  ngAfterViewInit() {
    this.cartService.getCartCount().subscribe((value) => {
      this.cartCount = value;
    });
  }

  toggleIcon() {
    // Toggle the show class on the menu icon element
    (document.getElementById('menu-icon') as HTMLDivElement).classList.toggle(
      'show'
    );
    // Toggle the show class on the nav list element
    const navList = document.querySelector('.nav-list') as HTMLElement;
    navList.classList.toggle('show');
  }
  toggleTheme() {
    const themeEle = this.themeEleRef.nativeElement as HTMLDivElement;
    // Change the theme
    this.theme = this.theme == Theme.Light ? Theme.Dark : Theme.Light;
    // Update the class list
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
