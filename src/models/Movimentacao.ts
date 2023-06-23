import {Entitty} from "@/models/entitty";
import {Veiculo} from "@/models/Veiculo";
import {Condutor} from "@/models/condutor";

export class Movimentacao extends Entitty{

    veiculo!: Veiculo
    condutor!: Condutor
    entrada!: Date
    saida!: Date
    //tempo!: number
   // tempoDesconto!: number
   // tempoMulta!: number
   // valorDesconto!: number
   // valorMulta!: number
  //  valorTotal!: number
   // valorHora!: number
   // valorHoraMulta!: number
   // configuracao!: number
   // versao!: number
}

export interface MovimentacaoCreateDto {
  id: number
  veiculo: {id: number}
  condutor: {id:number}
  entrada: Date
  saida: Date

}

