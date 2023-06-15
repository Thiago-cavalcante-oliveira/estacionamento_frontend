import {Entitty} from "@/models/entitty";
import {Marca} from "@/models/Marca";

export class Modelo extends Entitty{
    nome!: string
    marca!: Marca

    constructor() {
        super();
        this.ativo=true
    }
}