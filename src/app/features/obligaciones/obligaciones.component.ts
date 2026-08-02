import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FinanzasService } from '../../core/services/finanzas.service';
import { Obligacion } from '../../core/models/finanzas.model';

@Component({
  selector: 'app-obligaciones',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="wrap">
      <h1>Fijos y suscripciones</h1>
      <table *ngIf="obligaciones.length">
        <thead>
          <tr>
            <th>Concepto</th>
            <th>Tipo</th>
            <th>Día de cobro</th>
            <th>Monto</th>
          </tr>
        </thead>
        <tbody>
          <tr *ngFor="let o of obligaciones">
            <td>{{ o.concepto }}</td>
            <td><span class="badge" [class.sub]="o.tipo === 'Suscripcion'">{{ o.tipo }}</span></td>
            <td>{{ o.dia_cobro || '—' }}</td>
            <td>{{ o.monto_base | currency:'MXN' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  `,
  styles: [`
    .wrap { padding: 32px 40px; font-family: 'Inter', sans-serif; }
    h1 { font-family: 'Source Serif 4', Georgia, serif; font-size: 26px; margin-bottom: 20px; }
    table { width: 100%; border-collapse: collapse; }
    th, td { text-align: left; padding: 10px 12px; border-bottom: 1px solid #e3e1d8; font-size: 14px; }
    th { color: #8a8f8a; font-weight: 500; font-size: 12px; text-transform: uppercase; letter-spacing: 0.04em; }
    .badge { background: #f0eee7; padding: 2px 8px; border-radius: 4px; font-size: 12px; }
    .badge.sub { background: #fde8e0; }
  `],
})
export class ObligacionesComponent implements OnInit {
  obligaciones: Obligacion[] = [];

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit(): void {
    this.finanzasService.getObligaciones().subscribe((data) => (this.obligaciones = data));
  }
}
