import axios, {AxiosInstance} from "axios";
import {Condutor} from "@/models/condutor";

export class CondutorClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085/api/condutor',
            headers: {'Content-Type': 'application/json'}
        });
    }


    public async findById(id: number): Promise<Condutor> {

        try {
            return (await this.axiosClient.get(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findAll(): Promise<Condutor[]> {

        try {
            return (await this.axiosClient.get(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findAtivo(): Promise<Condutor[]> {

        try {
            return (await this.axiosClient.get(`/listaativo`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async atualizar(condutor: Condutor): Promise<string> {
        try {
            return (await this.axiosClient.put(`/${condutor.id}`,Condutor)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }


    public async delete(condutor: Condutor): Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${condutor.id}`)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async cadastrar(condutor: Condutor): Promise<void>{
        try{
            return (await this.axiosClient.post('', condutor))
        }catch (error: any){
            return Promise.reject(error.response)
        }
    }



}
