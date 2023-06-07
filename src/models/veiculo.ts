import {entitty} from "@/models/entitty";

export class veiculo extends entitty{
    placa!: string
    modelo!: string
    cor!: string
    tipo!: string
    ano!: number

    constructor() {
        super();
    }
}