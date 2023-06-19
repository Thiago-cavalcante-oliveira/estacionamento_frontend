import axios, {AxiosInstance} from "axios";
import {Veiculo} from "@/models/Veiculo";



export class VeiculoClient {
  private axiosClient: AxiosInstance;

  constructor() {
    this.axiosClient = axios.create({
      baseURL: 'http://localhost:8085/api/veiculo',
      headers: {'Content-Type': 'application/json'}
    });
  }



  public async findById(id: number): Promise<Veiculo> {

    try {
      return (await this.axiosClient.get(`/${id}`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
  public async findAll(): Promise<Veiculo[]> {

    try {
      return (await this.axiosClient.get(`/lista`)).data
    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }

  public async atualizar(veiculo: Veiculo): Promise<string> {
    try {
      return (await this.axiosClient.put(`/${veiculo.id}`,Veiculo)).data

    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }


  public async delete(veiculo: Veiculo): Promise<string> {
    try {
      return (await this.axiosClient.delete(`/${veiculo.id}`)).data

    } catch (error: any) {
      return Promise.reject(error.response)
    }
  }
  public async cadastrar(veiculo: Veiculo): Promise<void>{
    try{
      return (await this.axiosClient.post('', veiculo))
    }catch (error: any){
      return Promise.reject(error.response)
    }
  }


}
