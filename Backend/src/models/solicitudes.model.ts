import {Entity, model, property, hasOne} from '@loopback/repository';
import {Departamento} from './departamento.model';
import {Ciudad} from './ciudad.model';
import {Codeudor} from './codeudor.model';
import {EstadoSolicitud} from './estado-solicitud.model';
import {TipoOferta} from './tipo-oferta.model';
import {Usuario} from './usuario.model';

@model()
export class Solicitudes extends Entity {
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
  cargarContrato: string;

  @property({
    type: 'boolean',
    required: true,
  })
  RequiereCodeudor: boolean;

  @property({
    type: 'string',
    required: true,
  })
  comentarioAsesor: string;

  @property({
    type: 'string',
  })
  inmuebleId?: string;

  @hasOne(() => Departamento)
  departamento: Departamento;

  @hasOne(() => Ciudad)
  ciudad: Ciudad;

  @hasOne(() => Codeudor)
  codeudor: Codeudor;

  @hasOne(() => EstadoSolicitud)
  estadoSolicitud: EstadoSolicitud;

  @hasOne(() => TipoOferta)
  tipoOferta: TipoOferta;

  @hasOne(() => Usuario)
  usuario: Usuario;

  constructor(data?: Partial<Solicitudes>) {
    super(data);
  }
}

export interface SolicitudesRelations {
  // describe navigational properties here
}

export type SolicitudesWithRelations = Solicitudes & SolicitudesRelations;
