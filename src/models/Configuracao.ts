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


    constructor() {
        super();
    }


};

export interface CreateConfiguracaoDTO {

id?:number
valorHora: number
    valorMinutoMulta: number
    inicioExpediente: Date
    fimExpediente: Date
  tempoParaGerarDesconto: number
    tempoDeCreditoDesconto: number
    gerarDesconto: boolean
    vagasMoto: number
    vagasCarro: number
    vagasVan: number



}
