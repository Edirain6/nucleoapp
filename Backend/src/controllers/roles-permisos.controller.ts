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
  Roles,
  Permisos,
} from '../models';
import {RolesRepository} from '../repositories';

export class RolesPermisosController {
  constructor(
    @repository(RolesRepository) protected rolesRepository: RolesRepository,
  ) { }

  @get('/roles/{id}/permisos', {
    responses: {
      '200': {
        description: 'Array of Roles has many Permisos',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Permisos)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Permisos>,
  ): Promise<Permisos[]> {
    return this.rolesRepository.permisos(id).find(filter);
  }

  @post('/roles/{id}/permisos', {
    responses: {
      '200': {
        description: 'Roles model instance',
        content: {'application/json': {schema: getModelSchemaRef(Permisos)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Roles.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {
            title: 'NewPermisosInRoles',
            exclude: ['id'],
            optional: ['rolesId']
          }),
        },
      },
    }) permisos: Omit<Permisos, 'id'>,
  ): Promise<Permisos> {
    return this.rolesRepository.permisos(id).create(permisos);
  }

  @patch('/roles/{id}/permisos', {
    responses: {
      '200': {
        description: 'Roles.Permisos PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Permisos, {partial: true}),
        },
      },
    })
    permisos: Partial<Permisos>,
    @param.query.object('where', getWhereSchemaFor(Permisos)) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.rolesRepository.permisos(id).patch(permisos, where);
  }

  @del('/roles/{id}/permisos', {
    responses: {
      '200': {
        description: 'Roles.Permisos DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Permisos)) where?: Where<Permisos>,
  ): Promise<Count> {
    return this.rolesRepository.permisos(id).delete(where);
  }
}
