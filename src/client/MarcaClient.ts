import axios, {AxiosInstance} from "axios";
import {Marca} from "@/models/Marca";
import {Condutor} from "@/models/condutor";

export class MarcaClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8085/api/marca',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<Marca> {

        try {
            return (await this.axiosClient.get(`/${id}`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async findAll(): Promise<Marca[]> {

        try {
            return (await this.axiosClient.get(`/lista`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async findAtivo(id: number): Promise<Marca> {

        try {
            return (await this.axiosClient.get(`/listaAtiva`)).data
        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async atualizar(marca: Marca): Promise<string> {
        try {
            return (await this.axiosClient.put(`?id=${marca.id}`,marca)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }

    public async delete(id: number): Promise<string> {
        try {
            return (await this.axiosClient.delete(`/${id}`)).data

        } catch (error: any) {
            return Promise.reject(error.response)
        }
    }
    public async cadastrar(marca: Marca): Promise<void>{
        try{
            return (await this.axiosClient.post('', marca))
        }catch (error: any){
            return Promise.reject(error.response)
        }
    }


}
