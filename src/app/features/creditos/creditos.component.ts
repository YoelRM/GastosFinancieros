import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FinanzasService } from '../../core/services/finanzas.service';
import { Tarjeta } from '../../core/models/finanzas.model';

@Component({
  selector: 'app-creditos',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  template: `
    <div class="wrap">
      <h1>Tarjetas de crédito</h1>
      <div class="card" *ngFor="let t of tarjetas">
        <div class="row">
          <span class="nombre">{{ t.entidad.nombre }}</span>
          <span class="cifras">
            {{ t.deuda_actual | currency:'MXN' }}
            <span class="faint">/ {{ t.limite_total | currency:'MXN' }} límite</span>
          </span>
        </div>
        <div class="bar-track">
          <div
            class="bar-fill"
            [class.high]="pct(t) > 60"
            [style.width.%]="pct(t)"
          ></div>
        </div>
        <div class="disponible">Disponible: {{ (t.limite_total - t.deuda_actual) | currency:'MXN' }}</div>
      </div>
    </div>
  `,
  styles: [`
    .wrap { padding: 32px 40px; font-family: 'Inter', sans-serif; max-width: 640px; }
    h1 { font-family: 'Source Serif 4', Georgia, serif; font-size: 26px; margin-bottom: 20px; }
    .card { background: #fff; border: 1px solid #e3e1d8; border-radius: 10px; padding: 18px 20px; margin-bottom: 14px; }
    .row { display: flex; justify-content: space-between; font-size: 14px; margin-bottom: 8px; }
    .nombre { font-weight: 600; }
    .cifras { font-family: 'IBM Plex Mono', monospace; }
    .faint { color: #8a8f8a; }
    .bar-track { height: 6px; background: #efede5; border-radius: 4px; overflow: hidden; }
    .bar-fill { height: 100%; background: #bd8a29; border-radius: 4px; }
    .bar-fill.high { background: #ac3b41; }
    .disponible { margin-top: 8px; font-size: 12px; color: #8a8f8a; }
  `],
})
export class CreditosComponent implements OnInit {
  tarjetas: Tarjeta[] = [];

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit(): void {
    this.finanzasService.getTarjetas().subscribe((data) => (this.tarjetas = data));
  }

  pct(t: Tarjeta): number {
    return t.limite_total > 0 ? Math.min(100, (t.deuda_actual / t.limite_total) * 100) : 0;
  }
}
