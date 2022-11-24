import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Usuario, UsuarioRelations, Roles} from '../models';
import {RolesRepository} from './roles.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly roles: HasOneRepositoryFactory<Roles, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('RolesRepository') protected rolesRepositoryGetter: Getter<RolesRepository>,
  ) {
    super(Usuario, dataSource);
    this.roles = this.createHasOneRepositoryFactoryFor('roles', rolesRepositoryGetter);
    this.registerInclusionResolver('roles', this.roles.inclusionResolver);
  }
}
