import axios, {AxiosInstance} from "axios";
import {Condutor} from "@/models/condutor";

export class CondutorClient {
    private axiosClient: AxiosInstance;

    constructor() {
        this.axiosClient = axios.create({
            baseURL: 'http://localhost:8080/api/condutor',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async findById(id: number): Promise<Condutor> {

        try {
            return (await this.axiosClient.get<Condutor>(`/${id}`)).data
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