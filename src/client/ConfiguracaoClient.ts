import axios, {AxiosInstance} from "axios";
import {Configuracao} from "@/models/Configuracao";
import {Condutor} from "@/models/condutor";

export class ConfiguracaoClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/configuracao',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<Configuracao> {

        try {
            return (await this.axiosClient.get(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findAll(): Promise<Configuracao[]> {

        try {
            return (await this.axiosClient.get(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async atualizar(configuracao: Configuracao): Promise<string> {
        try {
            return (await this.axiosClient.put(`/${configuracao.id}`,Configuracao)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async delete(configuracao: Configuracao): Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${configuracao.id}`)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async cadastrar(configuracao: Configuracao): Promise<void>{
        try{
            return (await this.axiosClient.post('/', configuracao))
        }catch (error: any){
            return Promise.reject(error.response)
        }
    }


}