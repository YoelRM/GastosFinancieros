import { Component, OnInit } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FinanzasService } from '../../core/services/finanzas.service';
import { Dashboard, Pago } from '../../core/models/finanzas.model';
import { ToggleSwitchComponent } from '../../shared/components/toggle-switch/toggle-switch.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, ToggleSwitchComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent implements OnInit {
  data: Dashboard | null = null;
  loading = true;
  error: string | null = null;
  notaAbierta: number | null = null;

  constructor(private finanzasService: FinanzasService) {}

  ngOnInit(): void {
    this.cargarDashboard();
  }

  cargarDashboard(): void {
    this.loading = true;
    this.finanzasService.getDashboard().subscribe({
      next: (data) => {
        this.data = data;
        this.loading = false;
      },
      error: () => {
        this.error = 'No se pudo conectar con el backend. ¿Está corriendo en localhost:8000?';
        this.loading = false;
      },
    });
  }

  // Flujo 4.2 del documento de arquitectura: toggle -> PUT -> recálculo de efectivo
  onTogglePago(pago: Pago, nuevoEstado: boolean): void {
    const anterior = pago.pagado;
    pago.pagado = nuevoEstado; // actualización optimista

    this.finanzasService.actualizarPago(pago.id, nuevoEstado, pago.monto_pagado).subscribe({
      next: () => this.cargarDashboard(), // refresca efectivo_dia_hoy recalculado por el backend
      error: () => {
        pago.pagado = anterior; // revertir si falla
      },
    });
  }

  toggleNota(id: number): void {
    this.notaAbierta = this.notaAbierta === id ? null : id;
  }

  totalPagado(): number {
    if (!this.data) return 0;
    return this.data.pagos.filter((p) => p.pagado).reduce((s, p) => s + p.monto_pagado, 0);
  }

  totalSuscripciones(): number {
    if (!this.data) return 0;
    return this.data.suscripciones.reduce((s, o) => s + o.monto_base, 0);
  }

  totalDeuda(): number {
    if (!this.data) return 0;
    return this.data.tarjetas.reduce((s, t) => s + t.deuda_actual, 0);
  }

  totalLimite(): number {
    if (!this.data) return 0;
    return this.data.tarjetas.reduce((s, t) => s + t.limite_total, 0);
  }

  pctTarjeta(deuda: number, limite: number): number {
    return limite > 0 ? Math.min(100, (deuda / limite) * 100) : 0;
  }

  pctGasto(consumido: number, asignado: number): number {
    return asignado > 0 ? Math.min(100, (consumido / asignado) * 100) : 0;
  }
}
