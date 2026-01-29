import { Category } from "../../categories/shared/category.model";

export class Entry {
    constructor (
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public pago?: boolean,
        public categoriaId?: number,
        public categoria?: Category
    ){}

    static tipo = {
        despesa: 'Despesa',
        receita: 'Receita'
    };

    get pagoText(): string {
        return this.pago ? 'Pago' : "Não"
    }
}