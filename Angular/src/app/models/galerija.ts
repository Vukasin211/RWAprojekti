export class galerija
{
    id: number;
    url: string;
    kaficId: number;

    constructor(id: number, url: string, kaficId: number)
    {
        this.id = id;
        this.url = url;
        this.kaficId = kaficId;
    }
}