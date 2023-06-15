import axios, {AxiosInstance} from "axios";
import {Movimentacao} from "@/models/Movimentacao";


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
            return (await this.axiosClient.get<Movimentacao>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async findAll(id: number): Promise<[Movimentacao]> {

        try {
            return (await this.axiosClient.get<Movimentacao>(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async atualizar(id: number): Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`,Movimentacao)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }


    public async delete(id: number): Promise<string> {
        try {
            return (await this.axiosClient.delete<string>(`/${id}`)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }



}