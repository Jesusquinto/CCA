export class Usuario {


    constructor(email?: string, password?:string){
        this.email = email;
        this.password = password;
    }    


    id: number;
    identificacion: string;
    password: any;
    nombre: string;
    apellido: string;
    email: string;
    tipo_identificacion: any;
    fichas: string[];
    rol: number;
  }