import {Entity, model, property} from '@loopback/repository';

@model()
export class Inmobiliaria extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreinmobiliaria: string;

  @property({
    type: 'string',
    required: true,
  })
  direcion: string;

  @property({
    type: 'string',
    required: true,
  })
  mision: string;

  @property({
    type: 'string',
    required: true,
  })
  vision: string;

  @property({
    type: 'string',
    required: true,
  })
  telefono: string;

  @property({
    type: 'string',
    required: true,
  })
  nit: string;


  constructor(data?: Partial<Inmobiliaria>) {
    super(data);
  }
}

export interface InmobiliariaRelations {
  // describe navigational properties here
}

export type InmobiliariaWithRelations = Inmobiliaria & InmobiliariaRelations;
