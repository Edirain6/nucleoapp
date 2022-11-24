import {Entity, model, property} from '@loopback/repository';

@model()
export class Codeudor extends Entity {
  @property({
    type: 'string',
    required: true,
  })
  id: string;

  @property({
    type: 'string',
    required: true,
  })
  nombreCodeudor: string;

  @property({
    type: 'string',
  })
  solicitudesId?: string;

  constructor(data?: Partial<Codeudor>) {
    super(data);
  }
}

export interface CodeudorRelations {
  // describe navigational properties here
}

export type CodeudorWithRelations = Codeudor & CodeudorRelations;
