import {AuthenticationStrategy} from "@loopback/authentication";
import {service} from '@loopback/core';
import {Request, RedirectRoute, HttpErrors} from '@loopback/rest';
import {UserProfile} from '@loopback/security';
import {ParamsDictionary} from 'express-serve-static-core';
import parseBearerToken from 'parse-bearer-token';
import {ParsedQs} from 'qs';
import {AutenticacionService} from '../services';


export class estrategiaConfig implements AuthenticationStrategy{
  name: string ="config";

  constructor(
    @service(AutenticacionService)
    public servicioAutenticacion:AutenticacionService
){}
  async authenticate(request: Request): Promise<UserProfile | undefined> {
     let token = parseBearerToken(request);
     if (token){
        let datos=this.servicioAutenticacion.ValidarToken(token);
        if(datos){
          if (datos.data.rol[0].nombre=="Asesor") {
          let perfil: UserProfile = Object.assign({
              nombre: datos.data.nombre
          });

          return perfil;
        } else{
          throw new HttpErrors [401]("No tiene permisos para ingresar a este recurso");
        }
        }else{
            throw new HttpErrors[401]("El token no es valido");
        }

     }else{
        throw new HttpErrors [401]("No hay un token en esta solicitud");

     }
  }
}
