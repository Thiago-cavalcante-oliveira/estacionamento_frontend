import {Entitty} from "@/models/entitty";

export class Condutor extends Entitty{
    nome!: string
    cpf!:string
    telefone!:string
    tempoPagoEmMinuto?: number
    tempoPagoEmHora?: number
    tempoDesconto?: number

    constructor() {
        super();
    }



}
export interface CreateCondutorDTO{
  id?: number
  nome: string
  cpf:string
  telefone:string


}
