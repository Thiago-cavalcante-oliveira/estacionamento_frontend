import axios, {AxiosInstance} from "axios";
import {Configuracao} from "@/models/Configuracao";

export class ConfiguracaoClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/condutor',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<Configuracao> {

        try {
            return (await this.axiosClient.get<Configuracao>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async atualizar(id: number): Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`,Configuracao)).data

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