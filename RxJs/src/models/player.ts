import { from, Observable } from "rxjs";
import { Card } from "./card";
const API_URL = "http://localhost:3000/";

export class Player{

    public name: string;
    public lifePoints: number;
    public hand: Card[];
    public deck: Card[];
    public cardGraveyard: Card[] | null;

    public hadnObservable: Observable<Card[]>;
    

    constructor(name: string)
    {
        this.name = name;
        this.lifePoints = 8000;
        this.cardGraveyard = [];
        this.deck = [];
        this.hadnObservable = this.getCardsObservableFromJsonServer().pipe(
            
        );
        // .subscribe( (cards) => {
        //     this.hand = cards;
        //     console.log(`${this.name} hand je : ${this.hand[0].title}`);
        // })
    }

    getCardsObservableFromJsonServer(): Observable<Card[]>
    {
        return from(
            fetch(API_URL + "cards")
              .then((response) => {
                if (!response.ok) {
                  throw new Error("Cards not found");
                } else {
                  return response.json();
                }
              })
              .catch((err) => console.log(`Error `, err))
          );
    }
    
}