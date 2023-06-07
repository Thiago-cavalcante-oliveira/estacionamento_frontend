import {entitty} from "@/models/entitty";

export class Configuracao extends entitty{
    valorHora!: number
    valorMinutoMulta!: number
    inicioExpediente!: Date
    fimExpediente!: Date
    tempoDeCreditoDesconto!: number
    gerarDesconto!: boolean
    vagasMoto!: number
    vagasCarro!: number
    vagasVan!: number
    versao!: number

    constructor() {
        super();
    }

}