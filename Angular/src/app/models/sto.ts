export class Sto
{
    public id: number;
    public kaficId: number;
    public korisnikId: number;
    public brojOsoba: number;
    public rezervisan: string;
    public username: string

    constructor(id: number, kaficId: number, brojOsoba: number, rezervisan: string)
    {
        this.id = id;
        this.kaficId = kaficId;
        this.korisnikId = 0;
        this.brojOsoba = brojOsoba;
        this.rezervisan = rezervisan;
        this.username = "";
    }
}