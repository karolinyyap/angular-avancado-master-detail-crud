import { Category } from "../../categories/shared/category.model";

export class Entry {
    id?: number;
    nome?: string;
    descricao?: string;
    tipo?: string;
    valor?: string;
    data?: string;
    pago?: boolean;
    categoriaId?: number;
    categoria?: Category;

    static tipo = {
            despesa: 'Despesa',
            receita: 'Receita'
        }

    get pagoText(): string {
        return this.pago ? 'Pago' : 'Pendente';
    }
}
