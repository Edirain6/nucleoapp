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
  Codeudor,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesCodeudorController {
  constructor(
    @repository(SolicitudesRepository) protected solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Solicitudes has one Codeudor',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Codeudor),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Codeudor>,
  ): Promise<Codeudor> {
    return this.solicitudesRepository.codeudor(id).get(filter);
  }

  @post('/solicitudes/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Solicitudes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Codeudor)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Codeudor, {
            title: 'NewCodeudorInSolicitudes',
            exclude: ['id'],
            optional: ['solicitudesId']
          }),
        },
      },
    }) codeudor: Omit<Codeudor, 'id'>,
  ): Promise<Codeudor> {
    return this.solicitudesRepository.codeudor(id).create(codeudor);
  }

  @patch('/solicitudes/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Solicitudes.Codeudor PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Codeudor, {partial: true}),
        },
      },
    })
    codeudor: Partial<Codeudor>,
    @param.query.object('where', getWhereSchemaFor(Codeudor)) where?: Where<Codeudor>,
  ): Promise<Count> {
    return this.solicitudesRepository.codeudor(id).patch(codeudor, where);
  }

  @del('/solicitudes/{id}/codeudor', {
    responses: {
      '200': {
        description: 'Solicitudes.Codeudor DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Codeudor)) where?: Where<Codeudor>,
  ): Promise<Count> {
    return this.solicitudesRepository.codeudor(id).delete(where);
  }
}
