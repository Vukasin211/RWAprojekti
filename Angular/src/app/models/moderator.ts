import { Restoran } from "./restoran";

export class Moderator
{
    public username: string;
    public password: string;
    //public restoran: Restoran;

    constructor(name: string, pw: string)
    {
        this.username = name;
        this.password = pw;
        //this.restoran = new Restoran("0" , "", 0, "", "", "");
    }

    setLokal(lokal: Restoran)
    {
        //this.restoran = lokal;
    }
}