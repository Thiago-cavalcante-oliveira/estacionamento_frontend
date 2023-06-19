import {Entitty} from "@/models/entitty";

export class Configuracao extends Entitty{
    valorHora!: number
    valorMinutoMulta!: number
    inicioExpediente!: Date
    fimExpediente!: Date
    tempoDeCreditoDesconto!: number
    gerarDesconto!: boolean
    vagasMoto!: number
    vagasCarro!: number
    vagasVan!: number
    versao?: number

    constructor() {
        super();
    }
    

};

export interface CreateConfiguracaoDTO {


valorHora: number
    valorMinutoMulta: number
    inicioExpediente: Date
    fimExpediente: Date
    tempoDeCreditoDesconto: number
    gerarDesconto: boolean
    vagasMoto: number
    vagasCarro: number
    vagasVan: number
    versao?: number


}