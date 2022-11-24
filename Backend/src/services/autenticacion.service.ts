import { /* inject, */ BindingScope, injectable} from '@loopback/core';
import {repository} from '@loopback/repository';
import generatePassword from 'password-generator';
import {Keys} from '../configuracion/Keys';
import {Credenciales, Roles, Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
const generador = require("generate-password");
const cryptoJS= require("crypto-js");
const JWT = require("jsonwebtoken");

@injectable({scope: BindingScope.TRANSIENT})
export class AutenticacionService{
  constructor(
    @repository(UsuarioRepository)
    public UsuarioRepository: UsuarioRepository
  ) { }

  GenerarClave(){
    let password=generador.generate({
      length:8,
      numbers: true,
    });
    return password;
  }
Encriptar(password:string){
  let passCifrado=cryptoJS.MD5(password).toString();
  return passCifrado;
}

IdentificarUsuario(credenciales:Credenciales){
  try {
    //credenciales.password=this.Encriptar(credenciales.password);
    let p=this.UsuarioRepository.findOne({
      where: {
        correo: credenciales.usuario,
        password: credenciales.password

       }
    });
    return p;
  } catch {
    return false;
     {
   }
    }

}

GeneracionToken (usuario: Usuario){
  let token=JWT.sign({
    data:{
      id: usuario.id,
      correo: usuario.correo,
      nombre: usuario.nombre + " " + usuario.apellido


      }

        },

 Keys.LlaveJWT);
 return token;
}

ValidarToken(token: string){
  try {
    let datos= JWT.verify(token, Keys.LlaveJWT);
    return datos;
  } catch {
    return false;
  }
}

}
