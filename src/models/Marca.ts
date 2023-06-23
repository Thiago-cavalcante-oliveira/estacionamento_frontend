import {Entitty} from "@/models/entitty";


export class Marca extends Entitty{
    nome!: string



    constructor() {
        super()
        this.ativo = true
    }
}
