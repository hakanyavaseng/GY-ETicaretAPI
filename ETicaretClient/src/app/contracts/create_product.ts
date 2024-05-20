export class Create_Product {
    name: string;
    stock: number;
    price: number;
    constructor(name: string, stock: number, price: number) {
        this.name = name;
        this.stock = stock;
        this.price = price;
    }
}
