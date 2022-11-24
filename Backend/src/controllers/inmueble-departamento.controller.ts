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
  Departamento,
} from '../models';
import {InmuebleRepository} from '../repositories';

export class InmuebleDepartamentoController {
  constructor(
    @repository(InmuebleRepository) protected inmuebleRepository: InmuebleRepository,
  ) { }

  @get('/inmuebles/{id}/departamento', {
    responses: {
      '200': {
        description: 'Inmueble has one Departamento',
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
    return this.inmuebleRepository.departamento(id).get(filter);
  }

  @post('/inmuebles/{id}/departamento', {
    responses: {
      '200': {
        description: 'Inmueble model instance',
        content: {'application/json': {schema: getModelSchemaRef(Departamento)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Inmueble.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Departamento, {
            title: 'NewDepartamentoInInmueble',
            exclude: ['id'],
            optional: ['inmuebleId']
          }),
        },
      },
    }) departamento: Omit<Departamento, 'id'>,
  ): Promise<Departamento> {
    return this.inmuebleRepository.departamento(id).create(departamento);
  }

  @patch('/inmuebles/{id}/departamento', {
    responses: {
      '200': {
        description: 'Inmueble.Departamento PATCH success count',
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
    return this.inmuebleRepository.departamento(id).patch(departamento, where);
  }

  @del('/inmuebles/{id}/departamento', {
    responses: {
      '200': {
        description: 'Inmueble.Departamento DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Departamento)) where?: Where<Departamento>,
  ): Promise<Count> {
    return this.inmuebleRepository.departamento(id).delete(where);
  }
}
