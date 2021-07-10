import { combineLatest, from, fromEvent, Observable } from "rxjs";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";
import { Card } from "./card";

const API_URL = "http://localhost:3000/";

export class cardCollectionController {
  public cardCollectionObservable: Observable<Card[]>;

  constructor() {
    this.loadDbmsCard();
  }

  loadDbmsCard() {
    this.cardCollectionObservable = this.getAllCardsObservableFromJsonServer(
      "",
      ""
    );
  }

  getAllCardsObservableFromJsonServer(
    searched: string,
    type: string
  ): Observable<Card[]> {
    type = type.toLowerCase();
    if (searched === "") {
      var fetchApi = fetch(API_URL + "cards");
    } //?title=Celtic%20Guardian
    else {
      var fetchApi = fetch(API_URL + "cards" + `?${type}=` + searched);
    }
    var fetchVar = fetchApi
      .then((response) => {
        if (!response.ok) {
          throw new Error("Cards not found");
        } else {
          return response.json();
        }
      })
      .catch((err) => console.log(`Error `, err));
    return from(fetchVar);
  }

  deleteCard(card: Card) {
    return this.cardCollectionObservable.pipe(
      map((obsCard) =>
        obsCard.filter((singleObscard) => singleObscard !== card)
      )
    );
  }

  checkCardAttributeForSearch(card: Card, category: string){
      category = category.toLowerCase();

    if(category === "attack")
    {
        return card.attack
    }
    else if (category === "deffense")
    {
        return card.deffense
    }
    else if(category === "title")
    {
        return card.title
    }
    else 
    {
        return card.stars
    }
  }


  search(searchedValue: string, category: string) {
    //   searchedValue = searchedValue.toString();
    //   console.log(searchedValue);
    return from( this.cardCollectionObservable.pipe(
        map(cards => cards.filter(card => this.checkCardAttributeForSearch(card, category) == searchedValue))
    ))
    // this.cardCollectionObservable
    // .pipe(
    //  map(cards => cards.filter(card => this.checkCardAttributeForSearch(card, category) == searchedValue))
    // );
  }

}
