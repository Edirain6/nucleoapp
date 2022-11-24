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
  Ciudad,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleCiudadController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Inmueble has one Ciudad',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Ciudad),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Ciudad>,
  ): Promise<Ciudad> {
    return this.inmuebleRepository.ciudad(id).get(filter);
  }

  @post('/inmuebles/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudadInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.inmuebleRepository.ciudad(id).create(ciudad);
  }

  @patch('/inmuebles/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Inmueble.Ciudad PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {partial: true}),
        },
      },
    })
    ciudad: Partial<Ciudad>,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.inmuebleRepository.ciudad(id).patch(ciudad, where);
  }

  @del('/inmuebles/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Inmueble.Ciudad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.inmuebleRepository.ciudad(id).delete(where);
  }
}
