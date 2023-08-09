import { Category } from "./category";
import { User } from "./user";

export class Expense {
    id: number;
    price : number;
    currency : string;
    description: string;
    category: Category;
    date: Date;
    user:User;
}
