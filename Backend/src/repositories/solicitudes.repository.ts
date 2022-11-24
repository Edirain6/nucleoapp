import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Solicitudes, SolicitudesRelations, Departamento, Ciudad, Codeudor, EstadoSolicitud, TipoOferta, Usuario} from '../models';
import {DepartamentoRepository} from './departamento.repository';
import {CiudadRepository} from './ciudad.repository';
import {CodeudorRepository} from './codeudor.repository';
import {EstadoSolicitudRepository} from './estado-solicitud.repository';
import {TipoOfertaRepository} from './tipo-oferta.repository';
import {UsuarioRepository} from './usuario.repository';

export class SolicitudesRepository extends DefaultCrudRepository<
  Solicitudes,
  typeof Solicitudes.prototype.id,
  SolicitudesRelations
> {

  public readonly departamento: HasOneRepositoryFactory<Departamento, typeof Solicitudes.prototype.id>;

  public readonly ciudad: HasOneRepositoryFactory<Ciudad, typeof Solicitudes.prototype.id>;

  public readonly codeudor: HasOneRepositoryFactory<Codeudor, typeof Solicitudes.prototype.id>;

  public readonly estadoSolicitud: HasOneRepositoryFactory<EstadoSolicitud, typeof Solicitudes.prototype.id>;

  public readonly tipoOferta: HasOneRepositoryFactory<TipoOferta, typeof Solicitudes.prototype.id>;

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Solicitudes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('CodeudorRepository') protected codeudorRepositoryGetter: Getter<CodeudorRepository>, @repository.getter('EstadoSolicitudRepository') protected estadoSolicitudRepositoryGetter: Getter<EstadoSolicitudRepository>, @repository.getter('TipoOfertaRepository') protected tipoOfertaRepositoryGetter: Getter<TipoOfertaRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Solicitudes, dataSource);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.tipoOferta = this.createHasOneRepositoryFactoryFor('tipoOferta', tipoOfertaRepositoryGetter);
    this.registerInclusionResolver('tipoOferta', this.tipoOferta.inclusionResolver);
    this.estadoSolicitud = this.createHasOneRepositoryFactoryFor('estadoSolicitud', estadoSolicitudRepositoryGetter);
    this.registerInclusionResolver('estadoSolicitud', this.estadoSolicitud.inclusionResolver);
    this.codeudor = this.createHasOneRepositoryFactoryFor('codeudor', codeudorRepositoryGetter);
    this.registerInclusionResolver('codeudor', this.codeudor.inclusionResolver);
    this.ciudad = this.createHasOneRepositoryFactoryFor('ciudad', ciudadRepositoryGetter);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.departamento = this.createHasOneRepositoryFactoryFor('departamento', departamentoRepositoryGetter);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
  }
}
