import {entitty} from "@/models/entitty";

export class Movimentacao extends entitty{

    veiculo!: string
    condutor!: string
    entrada!: Date
    saida!: Date
    tempo!: number
    tempoDesconto!: number
    tempoMulta!: number
    valorDesconto!: number
    valorMulta!: number
    valorTotal!: number
    valorHora!: number
    valorHoraMulta!: number
    configuracao!: number
    versao!: number
}