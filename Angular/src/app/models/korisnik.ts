
export class Korisnik
{
    public id: number;
    public uloga: string;
    public ime: string;
    public prezime: string;
    public username: string;
    public password: string;
    public brTelefona: string;
    public email: string;
    public status: string | null;
    

    constructor(id: number, ime: string, prezime: string, username: string, email: string, brTelefona: string, password: string)
    {
        this.id = id;
        this.ime = ime;
        this.prezime = prezime;
        this.username = username;
        this.password = password;
        this.brTelefona = brTelefona;
        this.email = email;
        this.uloga = "korisnik";
        
        this.status = null;
    }

}