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
  Ciudad,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesCiudadController {
  constructor(
    @repository(SolicitudesRepository) protected solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Solicitudes has one Ciudad',
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
    return this.solicitudesRepository.ciudad(id).get(filter);
  }

  @post('/solicitudes/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Solicitudes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Ciudad)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Ciudad, {
            title: 'NewCiudadInSolicitudes',
            exclude: ['id'],
            optional: ['solicitudesId']
          }),
        },
      },
    }) ciudad: Omit<Ciudad, 'id'>,
  ): Promise<Ciudad> {
    return this.solicitudesRepository.ciudad(id).create(ciudad);
  }

  @patch('/solicitudes/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Solicitudes.Ciudad PATCH success count',
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
    return this.solicitudesRepository.ciudad(id).patch(ciudad, where);
  }

  @del('/solicitudes/{id}/ciudad', {
    responses: {
      '200': {
        description: 'Solicitudes.Ciudad DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Ciudad)) where?: Where<Ciudad>,
  ): Promise<Count> {
    return this.solicitudesRepository.ciudad(id).delete(where);
  }
}
