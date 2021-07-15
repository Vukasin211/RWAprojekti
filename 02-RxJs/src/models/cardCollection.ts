import { combineLatest, from, fromEvent, interval, Observable } from "rxjs";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";
import { Card } from "./card";

const API_URL = "http://localhost:3000/";

export class cardCollectionController {
  public cardCollectionObservable: Observable<Card[]>;
  public randomCardOrder: number[]

  constructor() {
    this.loadDbmsCard();
    this.randomCardOrder = [];
  }

  loadDbmsCard() {
    this.cardCollectionObservable = this.getAllCardsObservableFromJsonServer(
      "",
      ""
    );
    this.cardCollectionObservable.subscribe((cards) => {
      this.randomOrderSorter(cards);
    })
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

  checkCardAttributeForSearch(card: Card, category: string) {
    category = category.toLowerCase();

    if (category === "attack") {
      return card.attack;
    } else if (category === "deffense") {
      return card.deffense;
    } else if (category === "title") {
      return card.title;
    } else {
      return card.stars;
    }
  }

  search(searchedValue: string, category: string) {
    if (searchedValue !== "")
      return from(
        this.cardCollectionObservable.pipe(
          map((cards) =>
            cards.filter(
              (card) =>
                this.checkCardAttributeForSearch(card, category) ==
                searchedValue
            )
          )
        )
      );
    else {
      return this.cardCollectionObservable;
    }
  }
  searchObservable() {
    return combineLatest([comboBoxObservable, keyboardInpuObservable]).pipe(
      switchMap((card) =>
        this.search(<string>card[1], <string>card[0])
      )
    );
  }

  getCardCollectionStream()
  {
    console.log("cardCollectionStream");
    return interval(500).pipe(
      map((emit) => this.cardCollectionObservable)
    )
  }

  sort() {
    return from(
      this.cardCollectionObservable.pipe(
        map((cards) => this.randomOrderSorter(cards))
      )
    );
  }

  randomOrderPromiseGenerator(length: number) {
    console.log("generisan broj");
    return new Promise<number[]>((resolve, reject) => {
      let randomElementOrder = [];
      let count = 0;
      let temp = 0;
      let exists = false;
      let random = 0;
      while (count !== length) {
        exists = false;
        random = Math.round(Math.random() * length);
        if (count === 0) {
          randomElementOrder.push(random);
          count++;
        } else {
          randomElementOrder.forEach((el, inedx) => {
            if (random === el) {
              exists = true;
            }
          });
          if (exists === false) {
            randomElementOrder.push(random);
            count++;
          }
        }
      }
      //console.log(randomElementOrder);
      resolve(randomElementOrder);
    });
  }

  radnomOrderSorterTest(cards: Card[])
  {
    let tempCards: Card[] = [];

    this.randomCardOrder.forEach((el, index) => {
      tempCards.push(cards[el]);
    });
    return tempCards;
  }

  async randomOrderSorter(cards: Card[]): Promise<any> {
    this.randomCardOrder = await this.randomOrderPromiseGenerator(cards.length - 1);
    //let tempCards: Card[] = [];

    // array.forEach((el, index) => {
    //   tempCards.push(cards[el]);
    // });
    // return tempCards;
  }
}


function randomOrderPromiseGenerator(length: number) {
    console.log("generisan broj");
    return new Promise<number[]>((resolve, reject) => {
      let randomElementOrder = [];
      let count = 0;
      let temp = 0;
      let exists = false;
      let random = 0;
      while (count !== length) {
        exists = false;
        random = Math.round(Math.random() * length);
        if (count === 0) {
          randomElementOrder.push(random);
          count++;
        } else {
          randomElementOrder.forEach((el, inedx) => {
            if (random === el) {
              exists = true;
            }
          });
          if (exists === false) {
            randomElementOrder.push(random);
            count++;
          }
        }
      }
      //console.log(randomElementOrder);
      resolve(randomElementOrder);
    });
  }

function comboBoxValue() {
  var comboBox = document.getElementsByClassName("comboBoxInput");
  return (<HTMLInputElement>comboBox[0]).value;
}

function keyboardValue() {
  var inputBox = document.getElementsByClassName("searchInput");
  return (<HTMLInputElement>inputBox[0]).value;
}

const comboBoxObservable = new Observable((comboBox) => {
  setInterval(() => {
    comboBox.next(comboBoxValue());
  }, 1000);
});

const keyboardInpuObservable = new Observable((input) => {
  setInterval(() => {
    input.next(keyboardValue());
  }, 1000);
});
