import {entitty} from "@/models/entitty";


export class Marca extends entitty{
    nome!: string

    constructor() {
        super()
        this.ativo = true
    }
}