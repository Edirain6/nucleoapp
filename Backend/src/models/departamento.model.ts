import {Entity, model, property} from '@loopback/repository';

@model()
export class Departamento extends Entity {
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
  nombreDepartamento: string;

  @property({
    type: 'string',
  })
  inmuebleId?: string;

  @property({
    type: 'string',
  })
  solicitudesId?: string;

  constructor(data?: Partial<Departamento>) {
    super(data);
  }
}

export interface DepartamentoRelations {
  // describe navigational properties here
}

export type DepartamentoWithRelations = Departamento & DepartamentoRelations;
