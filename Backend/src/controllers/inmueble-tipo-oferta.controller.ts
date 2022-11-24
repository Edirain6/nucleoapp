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
  Inmueble,
  TipoOferta,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleTipoOfertaController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'Inmueble has one TipoOferta',
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
    return this.inmuebleRepository.tipoOferta(id).get(filter);
  }

  @post('/inmuebles/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoOferta)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoOferta, {
            title: 'NewTipoOfertaInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) tipoOferta: Omit<TipoOferta, 'id'>,
  ): Promise<TipoOferta> {
    return this.inmuebleRepository.tipoOferta(id).create(tipoOferta);
  }

  @patch('/inmuebles/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'Inmueble.TipoOferta PATCH success count',
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
    return this.inmuebleRepository.tipoOferta(id).patch(tipoOferta, where);
  }

  @del('/inmuebles/{id}/tipo-oferta', {
    responses: {
      '200': {
        description: 'Inmueble.TipoOferta DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoOferta)) where?: Where<TipoOferta>,
  ): Promise<Count> {
    return this.inmuebleRepository.tipoOferta(id).delete(where);
  }
}
