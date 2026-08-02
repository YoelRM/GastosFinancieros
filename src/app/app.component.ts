import { Component } from '@angular/core';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  template: `
    <nav class="nav">
      <span class="brand">Finanzas</span>
      <a routerLink="/dashboard" routerLinkActive="active">Dashboard</a>
      <a routerLink="/obligaciones" routerLinkActive="active">Obligaciones</a>
      <a routerLink="/creditos" routerLinkActive="active">Créditos</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .nav {
      display: flex;
      align-items: center;
      gap: 24px;
      padding: 14px 40px;
      background: #1e2422;
      font-family: 'Inter', sans-serif;
    }
    .brand { color: #faf9f6; font-weight: 600; margin-right: 12px; }
    .nav a { color: #8a8f8a; text-decoration: none; font-size: 14px; }
    .nav a.active { color: #faf9f6; }
  `],
})
export class AppComponent {}
