import { Category } from "./category";

export class Expense {
    id: number;
    price : number;
    currency : string;
    description: string;
    category: Category;
    date: Date;
}
