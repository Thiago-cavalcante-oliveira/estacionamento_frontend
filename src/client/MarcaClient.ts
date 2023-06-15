import axios, {AxiosInstance} from "axios";
import {Marca} from "@/models/Marca";

export class MarcaClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/condutor',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<Marca> {

        try {
            return (await this.axiosClient.get<Marca>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async findAll(id: number): Promise<[Marca]> {

        try {
            return (await this.axiosClient.get<Marca>(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findAtivo(id: number): Promise<[Marca]> {

        try {
            return (await this.axiosClient.get<Marca>(`/listaAtiva`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async atualizar(id: number): Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`,Marca)).data

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