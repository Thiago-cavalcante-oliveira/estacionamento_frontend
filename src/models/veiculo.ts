import {Entitty} from "@/models/entitty";
import {Tipo} from "@/models/tipo";
import {Modelo} from "@/models/modelo";

export class Veiculo extends Entitty{
    placa!: string
    modelo!: Modelo
    cor!: string
    tipo!: Tipo
    ano!: number

    constructor() {
        super();
    }
}