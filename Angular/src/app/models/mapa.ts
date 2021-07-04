export class Mapa
{
    public idKafice: number;
    public mapaURL: string;

    constructor(id: number, idKaf: number, mapaUrl: string)
    {
        this.idKafice = idKaf;
        this.mapaURL = mapaUrl;
    }
}