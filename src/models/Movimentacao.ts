import {Entitty} from "@/models/entitty";
import {Veiculo} from "@/models/Veiculo";
import {Condutor} from "@/models/condutor";

export class Movimentacao extends Entitty {

  veiculo!: Veiculo
  condutor!: Condutor
  entrada!: Date
  horaEntrada!: Date
  saida!: Date
  horaSaida!: Date
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

  constructor(entrada: Date, saida: Date) {
    super();
    this.entrada = entrada
    this.horaEntrada = entrada
    this.saida = saida
    this.horaSaida = saida
  }



}

export interface MovimentacaoCreateDto {
  id: number
  veiculo: { id: number }
  condutor: { id: number }
  entrada: Date
  saida: Date


}

