import {Entitty} from "@/models/entitty";
import {Tipo} from "@/models/Tipo";
import {Modelo} from "@/models/Modelo";

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
