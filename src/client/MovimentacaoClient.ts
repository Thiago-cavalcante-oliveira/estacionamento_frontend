import axios, {AxiosInstance} from "axios";
import {Movimentacao} from "@/models/Movimentacao";
import {Condutor} from "@/models/condutor";


export class MovimentacaoClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/condutor',
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
    public async findAll(id: number): Promise<Movimentacao[]> {

        try {
            return (await this.axiosClient.get(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async atualizar(movimentacao: Movimentacao): Promise<string> {
        try {
            return (await this.axiosClient.put(`/${movimentacao.id}` , movimentacao)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }


    public async delete(movimentacao: Movimentacao): Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${movimentacao.id}`)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(movimentacao: Movimentacao): Promise<void>{
        try{
            return (await this.axiosClient.post('/', movimentacao))
        }catch (error: any){
            return Promise.reject(error.response)
        }
    }



}