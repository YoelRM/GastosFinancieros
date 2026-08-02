import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Dashboard, Pago, Tarjeta, Obligacion } from '../models/finanzas.model';

@Injectable({ providedIn: 'root' })
export class FinanzasService {
  private readonly baseUrl = `${environment.apiUrl}/api`;

  constructor(private http: HttpClient) {}

  getDashboard(): Observable<Dashboard> {
    return this.http.get<Dashboard>(`${this.baseUrl}/dashboard`);
  }

  actualizarPago(id: number, pagado: boolean, montoPagado?: number): Observable<Pago> {
    return this.http.put<Pago>(`${this.baseUrl}/pagos/${id}`, {
      pagado,
      monto_pagado: montoPagado,
    });
  }

  getTarjetas(): Observable<Tarjeta[]> {
    return this.http.get<Tarjeta[]>(`${this.baseUrl}/tarjetas`);
  }

  getObligaciones(): Observable<Obligacion[]> {
    return this.http.get<Obligacion[]>(`${this.baseUrl}/obligaciones`);
  }
}
