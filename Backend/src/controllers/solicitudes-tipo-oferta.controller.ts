import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Solicitudes,
  TipoOferta,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesTipoOfertaController {
  constructor(
    @repository(SolicitudesRepository) protected solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'Solicitudes has one TipoOferta',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoOferta),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoOferta>,
  ): Promise<TipoOferta> {
    return this.solicitudesRepository.tipoOferta(id).get(filter);
  }

  @post('/solicitudes/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'Solicitudes model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoOferta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOferta, {
            title: 'NewTipoOfertaInSolicitudes',
            exclude: ['id'],
            optional: ['solicitudesId']
          }),
        },
      },
    }) tipoOferta: Omit<TipoOferta, 'id'>,
  ): Promise<TipoOferta> {
    return this.solicitudesRepository.tipoOferta(id).create(tipoOferta);
  }

  @patch('/solicitudes/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'Solicitudes.TipoOferta PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOferta, {partial: true}),
        },
      },
    })
    tipoOferta: Partial<TipoOferta>,
    @param.query.object('where', getWhereSchemaFor(TipoOferta)) where?: Where<TipoOferta>,
  ): Promise<Count> {
    return this.solicitudesRepository.tipoOferta(id).patch(tipoOferta, where);
  }

  @del('/solicitudes/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'Solicitudes.TipoOferta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoOferta)) where?: Where<TipoOferta>,
  ): Promise<Count> {
    return this.solicitudesRepository.tipoOferta(id).delete(where);
  }
}
