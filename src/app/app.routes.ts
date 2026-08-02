import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { ObligacionesComponent } from './features/obligaciones/obligaciones.component';
import { CreditosComponent } from './features/creditos/creditos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'obligaciones', component: ObligacionesComponent },
  { path: 'creditos', component: CreditosComponent },
];
