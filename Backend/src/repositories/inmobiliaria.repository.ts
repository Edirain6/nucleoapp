import {inject} from '@loopback/core';
import {DefaultCrudRepository} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmobiliaria, InmobiliariaRelations} from '../models';

export class InmobiliariaRepository extends DefaultCrudRepository<
  Inmobiliaria,
  typeof Inmobiliaria.prototype.id,
  InmobiliariaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Inmobiliaria, dataSource);
  }
}
