import {entitty} from "@/models/entitty";

export class modelo extends entitty{
    nome!: string
    marca!: string

    constructor() {
        super();
        this.ativo=true
    }
}