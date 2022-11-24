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
  TipoInmueble,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleTipoInmuebleController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/tipo-inmueble', {
    responses: {
      '200': {
        description: 'Inmueble has one TipoInmueble',
        content: {
          'application/json': {
            schema: getModelSchemaRef(TipoInmueble),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<TipoInmueble>,
  ): Promise<TipoInmueble> {
    return this.inmuebleRepository.tipoInmueble(id).get(filter);
  }

  @post('/inmuebles/{id}/tipo-inmueble', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(TipoInmueble)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoInmueble, {
            title: 'NewTipoInmuebleInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) tipoInmueble: Omit<TipoInmueble, 'id'>,
  ): Promise<TipoInmueble> {
    return this.inmuebleRepository.tipoInmueble(id).create(tipoInmueble);
  }

  @patch('/inmuebles/{id}/tipo-inmueble', {
    responses: {
      '200': {
        description: 'Inmueble.TipoInmueble PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(TipoInmueble, {partial: true}),
        },
      },
    })
    tipoInmueble: Partial<TipoInmueble>,
    @param.query.object('where', getWhereSchemaFor(TipoInmueble)) where?: Where<TipoInmueble>,
  ): Promise<Count> {
    return this.inmuebleRepository.tipoInmueble(id).patch(tipoInmueble, where);
  }

  @del('/inmuebles/{id}/tipo-inmueble', {
    responses: {
      '200': {
        description: 'Inmueble.TipoInmueble DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(TipoInmueble)) where?: Where<TipoInmueble>,
  ): Promise<Count> {
    return this.inmuebleRepository.tipoInmueble(id).delete(where);
  }
}
