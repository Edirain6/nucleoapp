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
  Departamento,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesDepartamentoController {
  constructor(
    @repository(SolicitudesRepository) protected solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/departamento', {
    responses: {
      '200': {
        description: 'Solicitudes has one Departamento',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Departamento),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Departamento>,
  ): Promise<Departamento> {
    return this.solicitudesRepository.departamento(id).get(filter);
  }

  @post('/solicitudes/{id}/departamento', {
    responses: {
      '200': {
        description: 'Solicitudes model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInSolicitudes',
            exclude: ['id'],
            optional: ['solicitudesId']
          }),
        },
      },
    }) departamento: Omit<Departamento, 'id'>,
  ): Promise<Departamento> {
    return this.solicitudesRepository.departamento(id).create(departamento);
  }

  @patch('/solicitudes/{id}/departamento', {
    responses: {
      '200': {
        description: 'Solicitudes.Departamento PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {partial: true}),
        },
      },
    })
    departamento: Partial<Departamento>,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.solicitudesRepository.departamento(id).patch(departamento, where);
  }

  @del('/solicitudes/{id}/departamento', {
    responses: {
      '200': {
        description: 'Solicitudes.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.solicitudesRepository.departamento(id).delete(where);
  }
}
