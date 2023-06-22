import axios, {AxiosInstance} from "axios";
import {Movimentacao, MovimentacaoCreateDto} from "@/models/Movimentacao";
import {Condutor} from "@/models/condutor";


export class MovimentacaoClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085/api/movimentacao',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<Movimentacao> {

        try {
            return (await this.axiosClient.get(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async findAll(): Promise<Movimentacao[]> {

        try {
            return (await this.axiosClient.get(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async atualizar(movimentacao: MovimentacaoCreateDto): Promise<string> {
        try {
            return (await this.axiosClient.put(`/${movimentacao.id}` , movimentacao)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

  public async finalizar(movimentacao: MovimentacaoCreateDto): Promise<string> {
    try {
      return (await this.axiosClient.patch(`/${movimentacao.id}` , movimentacao)).data

    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }


    public async delete(movimentacao: MovimentacaoCreateDto): Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${movimentacao.id}`)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(movimentacao: MovimentacaoCreateDto): Promise<void>{
        try{
            return (await this.axiosClient.post('', movimentacao))
        }catch (error: any){
            return Promise.reject(error.response)
        }
    }



}
