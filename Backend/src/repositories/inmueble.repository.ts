import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory, HasManyRepositoryFactory} from '@loopback/repository';
import {MongodbDataSource} from '../datasources';
import {Inmueble, InmuebleRelations, TipoInmueble, TipoOferta, Departamento, Ciudad, Usuario, Solicitudes} from '../models';
import {TipoInmuebleRepository} from './tipo-inmueble.repository';
import {TipoOfertaRepository} from './tipo-oferta.repository';
import {DepartamentoRepository} from './departamento.repository';
import {CiudadRepository} from './ciudad.repository';
import {UsuarioRepository} from './usuario.repository';
import {SolicitudesRepository} from './solicitudes.repository';

export class InmuebleRepository extends DefaultCrudRepository<
  Inmueble,
  typeof Inmueble.prototype.id,
  InmuebleRelations
> {

  public readonly tipoInmueble: HasOneRepositoryFactory<TipoInmueble, typeof Inmueble.prototype.id>;

  public readonly tipoOferta: HasOneRepositoryFactory<TipoOferta, typeof Inmueble.prototype.id>;

  public readonly departamento: HasOneRepositoryFactory<Departamento, typeof Inmueble.prototype.id>;

  public readonly ciudad: HasOneRepositoryFactory<Ciudad, typeof Inmueble.prototype.id>;

  public readonly usuario: HasOneRepositoryFactory<Usuario, typeof Inmueble.prototype.id>;

  public readonly solicitudes: HasManyRepositoryFactory<Solicitudes, typeof Inmueble.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('TipoInmuebleRepository') protected tipoInmuebleRepositoryGetter: Getter<TipoInmuebleRepository>, @repository.getter('TipoOfertaRepository') protected tipoOfertaRepositoryGetter: Getter<TipoOfertaRepository>, @repository.getter('DepartamentoRepository') protected departamentoRepositoryGetter: Getter<DepartamentoRepository>, @repository.getter('CiudadRepository') protected ciudadRepositoryGetter: Getter<CiudadRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('SolicitudesRepository') protected solicitudesRepositoryGetter: Getter<SolicitudesRepository>,
  ) {
    super(Inmueble, dataSource);
    this.solicitudes = this.createHasManyRepositoryFactoryFor('solicitudes', solicitudesRepositoryGetter,);
    this.registerInclusionResolver('solicitudes', this.solicitudes.inclusionResolver);
    this.usuario = this.createHasOneRepositoryFactoryFor('usuario', usuarioRepositoryGetter);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.ciudad = this.createHasOneRepositoryFactoryFor('ciudad', ciudadRepositoryGetter);
    this.registerInclusionResolver('ciudad', this.ciudad.inclusionResolver);
    this.departamento = this.createHasOneRepositoryFactoryFor('departamento', departamentoRepositoryGetter);
    this.registerInclusionResolver('departamento', this.departamento.inclusionResolver);
    this.tipoOferta = this.createHasOneRepositoryFactoryFor('tipoOferta', tipoOfertaRepositoryGetter);
    this.registerInclusionResolver('tipoOferta', this.tipoOferta.inclusionResolver);
    this.tipoInmueble = this.createHasOneRepositoryFactoryFor('tipoInmueble', tipoInmuebleRepositoryGetter);
    this.registerInclusionResolver('tipoInmueble', this.tipoInmueble.inclusionResolver);
  }
}
