import axios, {AxiosInstance} from "axios";
import {Modelo} from "@/models/Modelo";
import {Condutor} from "@/models/condutor";

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
            return (await this.axiosClient.get(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async findAll(id: number): Promise<Modelo[]> {

        try {
            return (await this.axiosClient.get(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async atualizar(modelo: Modelo): Promise<string> {
        try {
            return (await this.axiosClient.put(`/${modelo.id}`,Modelo)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }


    public async delete(modelo: Modelo): Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${modelo.id}`)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async cadastrar(modelo: Modelo): Promise<void>{
        try{
            return (await this.axiosClient.post('/', modelo))
        }catch (error: any){
            return Promise.reject(error.response)
        }
    }


}