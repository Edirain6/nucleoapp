import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {EstadoSolicitud} from '../models';
import {EstadoSolicitudRepository} from '../repositories';

export class EstadoSolicitudController {
  constructor(
    @repository(EstadoSolicitudRepository)
    public estadoSolicitudRepository : EstadoSolicitudRepository,
  ) {}

  @post('/estado-solicitud')
  @response(200, {
    description: 'EstadoSolicitud model instance',
    content: {'application/json': {schema: getModelSchemaRef(EstadoSolicitud)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {
            title: 'NewEstadoSolicitud',
            exclude: ['id'],
          }),
        },
      },
    })
    estadoSolicitud: Omit<EstadoSolicitud, 'id'>,
  ): Promise<EstadoSolicitud> {
    return this.estadoSolicitudRepository.create(estadoSolicitud);
  }

  @get('/estado-solicitud/count')
  @response(200, {
    description: 'EstadoSolicitud model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(EstadoSolicitud) where?: Where<EstadoSolicitud>,
  ): Promise<Count> {
    return this.estadoSolicitudRepository.count(where);
  }

  @get('/estado-solicitud')
  @response(200, {
    description: 'Array of EstadoSolicitud model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(EstadoSolicitud, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(EstadoSolicitud) filter?: Filter<EstadoSolicitud>,
  ): Promise<EstadoSolicitud[]> {
    return this.estadoSolicitudRepository.find(filter);
  }

  @patch('/estado-solicitud')
  @response(200, {
    description: 'EstadoSolicitud PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {partial: true}),
        },
      },
    })
    estadoSolicitud: EstadoSolicitud,
    @param.where(EstadoSolicitud) where?: Where<EstadoSolicitud>,
  ): Promise<Count> {
    return this.estadoSolicitudRepository.updateAll(estadoSolicitud, where);
  }

  @get('/estado-solicitud/{id}')
  @response(200, {
    description: 'EstadoSolicitud model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(EstadoSolicitud, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(EstadoSolicitud, {exclude: 'where'}) filter?: FilterExcludingWhere<EstadoSolicitud>
  ): Promise<EstadoSolicitud> {
    return this.estadoSolicitudRepository.findById(id, filter);
  }

  @patch('/estado-solicitud/{id}')
  @response(204, {
    description: 'EstadoSolicitud PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {partial: true}),
        },
      },
    })
    estadoSolicitud: EstadoSolicitud,
  ): Promise<void> {
    await this.estadoSolicitudRepository.updateById(id, estadoSolicitud);
  }

  @put('/estado-solicitud/{id}')
  @response(204, {
    description: 'EstadoSolicitud PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() estadoSolicitud: EstadoSolicitud,
  ): Promise<void> {
    await this.estadoSolicitudRepository.replaceById(id, estadoSolicitud);
  }

  @del('/estado-solicitud/{id}')
  @response(204, {
    description: 'EstadoSolicitud DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.estadoSolicitudRepository.deleteById(id);
  }
}
