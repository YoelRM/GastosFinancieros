// Reflejan los esquemas Pydantic del backend (app/schemas/schemas.py)

export interface Obligacion {
  id: number;
  tipo: 'Fijo' | 'Suscripcion';
  concepto: string;
  monto_base: number;
  dia_cobro?: string;
}

export interface Pago {
  id: number;
  obligacion: Obligacion;
  monto_pagado: number;
  pagado: boolean;
  fecha_transaccion?: string;
  notas?: string;
}

export interface Entidad {
  id: number;
  nombre: string;
}

export interface Tarjeta {
  id: number;
  entidad: Entidad;
  limite_total: number;
  deuda_actual: number;
}

export interface GastoVariable {
  id: number;
  categoria: string;
  monto_asignado: number;
  monto_consumido: number;
}

export interface Dashboard {
  ingreso_semanal: number;
  ingreso_mensual: number;
  efectivo_dia_hoy: number;
  pagos: Pago[];
  suscripciones: Obligacion[];
  tarjetas: Tarjeta[];
  gastos_variables: GastoVariable[];
}
