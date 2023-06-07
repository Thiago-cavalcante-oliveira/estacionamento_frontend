import {entitty} from "@/models/entitty";

export class condutor extends entitty{
    nome!: string
    cpf!:string
    telefone!:string
    tempoPagoEmMinuto!: number
    tempoPagoEmHora!: number
    tempoDesconto!: number

    constructor() {
        super();
    }

}