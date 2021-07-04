
export class Card{

    public id: number;
    public title: string;
    public stars: number;
    public description: string;
    public attack: number;
    public deffense: number;
    public imgPath: string;
    public effect: string[];

    constructor()
    {
        this.imgPath = "./resorces/CelticGuardian.png"
    }
}