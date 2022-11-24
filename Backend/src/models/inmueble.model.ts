import {Entity, model, property, hasOne, hasMany} from '@loopback/repository';
import {TipoInmueble} from './tipo-inmueble.model';
import {TipoOferta} from './tipo-oferta.model';
import {Departamento} from './departamento.model';
import {Ciudad} from './ciudad.model';
import {Usuario} from './usuario.model';
import {Solicitudes} from './solicitudes.model';

@model()
export class Inmueble extends Entity {
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
  direccion: string;

  @property({
    type: 'string',
    required: true,
  })
  imagen: string;

  @property({
    type: 'string',
    required: true,
  })
  linkyoutube: string;

  @hasOne(() => TipoInmueble)
  tipoInmueble: TipoInmueble;

  @hasOne(() => TipoOferta)
  tipoOferta: TipoOferta;

  @hasOne(() => Departamento)
  departamento: Departamento;

  @hasOne(() => Ciudad)
  ciudad: Ciudad;

  @hasOne(() => Usuario)
  usuario: Usuario;

  @hasMany(() => Solicitudes)
  solicitudes: Solicitudes[];

  constructor(data?: Partial<Inmueble>) {
    super(data);
  }
}

export interface InmuebleRelations {
  // describe navigational properties here
}

export type InmuebleWithRelations = Inmueble & InmuebleRelations;
