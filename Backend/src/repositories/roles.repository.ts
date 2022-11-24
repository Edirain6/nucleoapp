import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Roles, RolesRelations, Permisos} from '../models';
import {PermisosRepository} from './permisos.repository';

export class RolesRepository extends DefaultCrudRepository<
  Roles,
  typeof Roles.prototype.id,
  RolesRelations
> {

  public readonly permisos: HasManyRepositoryFactory<Permisos, typeof Roles.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PermisosRepository') protected permisosRepositoryGetter: Getter<PermisosRepository>,
  ) {
    super(Roles, dataSource);
    this.permisos = this.createHasManyRepositoryFactoryFor('permisos', permisosRepositoryGetter,);
    this.registerInclusionResolver('permisos', this.permisos.inclusionResolver);
  }
}
