import { CategoryDTO } from "./category";
import { UserDTO } from "./user";

export class ExpenseDTO {
    id: number;
    price : number;
    currency : string;
    description: string;
    category: CategoryDTO;
    date: Date;
    user:UserDTO;
}
