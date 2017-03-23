import Book from "../books/book.model";

export default class Checkout{
    public books : Array<Book>;
    public userid : string;
    public date : Date;    
}