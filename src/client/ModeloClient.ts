import axios, {AxiosInstance} from "axios";
import {Modelo} from "@/models/Modelo";

export class ModeloClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/condutor',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<Modelo> {

        try {
            return (await this.axiosClient.get<Modelo>(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async findAll(id: number): Promise<[Modelo]> {

        try {
            return (await this.axiosClient.get<Modelo>(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async atualizar(id: number): Promise<string> {
        try {
            return (await this.axiosClient.put<string>(`/${id}`,Modelo)).data

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