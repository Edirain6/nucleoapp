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
  EstadoSolicitud,
} from '../models';
import {SolicitudesRepository} from '../repositories';

export class SolicitudesEstadoSolicitudController {
  constructor(
    @repository(SolicitudesRepository) protected solicitudesRepository: SolicitudesRepository,
  ) { }

  @get('/solicitudes/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'Solicitudes has one EstadoSolicitud',
        content: {
          'application/json': {
            schema: getModelSchemaRef(EstadoSolicitud),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<EstadoSolicitud>,
  ): Promise<EstadoSolicitud> {
    return this.solicitudesRepository.estadoSolicitud(id).get(filter);
  }

  @post('/solicitudes/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'Solicitudes model instance',
        content: {'application/json': {schema: getModelSchemaRef(EstadoSolicitud)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Solicitudes.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {
            title: 'NewEstadoSolicitudInSolicitudes',
            exclude: ['id'],
            optional: ['solicitudesId']
          }),
        },
      },
    }) estadoSolicitud: Omit<EstadoSolicitud, 'id'>,
  ): Promise<EstadoSolicitud> {
    return this.solicitudesRepository.estadoSolicitud(id).create(estadoSolicitud);
  }

  @patch('/solicitudes/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'Solicitudes.EstadoSolicitud PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(EstadoSolicitud, {partial: true}),
        },
      },
    })
    estadoSolicitud: Partial<EstadoSolicitud>,
    @param.query.object('where', getWhereSchemaFor(EstadoSolicitud)) where?: Where<EstadoSolicitud>,
  ): Promise<Count> {
    return this.solicitudesRepository.estadoSolicitud(id).patch(estadoSolicitud, where);
  }

  @del('/solicitudes/{id}/estado-solicitud', {
    responses: {
      '200': {
        description: 'Solicitudes.EstadoSolicitud DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(EstadoSolicitud)) where?: Where<EstadoSolicitud>,
  ): Promise<Count> {
    return this.solicitudesRepository.estadoSolicitud(id).delete(where);
  }
}
