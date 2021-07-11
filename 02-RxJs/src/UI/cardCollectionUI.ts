import { combineLatest, from, fromEvent, Observable, zip } from "rxjs";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";
import { Card } from "../models/card";
import { cardCollectionController } from "../models/cardCollection";

export class cardCollectionUI {
    public cardCollection: cardCollectionController;
  public testCards: Card[];
  constructor() {
    this.testCards = [];
    this.cardCollection = new cardCollectionController();

  }

  drawList() {
      document.getElementById("cardDetail").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    this.cardCollection.cardCollectionObservable.pipe(
      switchMap((cards) => this.search()),
      //map(async (cards) => await this.testSort(cards))

    ).subscribe((cards) => {


      // //Test za random sortiranje nisam provalio kako funkcionise
      // cards.then((cards1) =>{
      //   if (cards1[0] !== undefined) {
      //     if (cards1[0].title !== "") {
      //       clearCardDiv();
      //       cards1.forEach((el: Card) => {
      //         this.addItem(el);
      //       });
      //       // this.randomOrderSorter(cards);
      //       // console.log(cards)
      //     }
      //   }
      // })
      
      if (cards[0] !== undefined) {
        if (cards[0].title !== "") {
          clearCardDiv();
          cards.forEach((el: Card) => {
            this.addItem(el);
          });
        }
      }
    });
  }

  testSort(cards: Card[])
  {
    this.testSortButton(cards);
    return this.cardCollection.randomOrderSorter(cards)//this.cardCollection.randomOrderSorter(cards)

  }

  testSortButton(cards: Card[])
  {
    zip(sortButton(), this.cardCollection.randomOrderSorter(cards)).pipe(
      switchMap((newCards) => this.cardCollection.randomOrderSorter(cards))
    ).subscribe((newCards) => {
      this.testCards = newCards
      console.log(this.testCards);
    })
    return this.testCards
  }

  search() {
    return  combineLatest([comboBoxObservable, keyboardInpuObservable])
    .pipe(
      switchMap(
        (card) => this.cardCollection.search(<string>card[1], <string>card[0])
      )
    )
  }
  

  addItem(card: Card) {
    
    let mainCardDiv = document.createElement("div");
    mainCardDiv.className = "mainSingleCardDiv";
    document.getElementById("output").appendChild(mainCardDiv);

    let cardDiv = document.createElement("div");
    cardDiv.className = "cardUiStyle";
    cardDiv.id = "test";
    mainCardDiv.appendChild(cardDiv);

    let cardIMG = document.createElement("img");
    cardIMG.src = card.imgPath;
    cardIMG.className = "cardUiImg";
    cardDiv.appendChild(cardIMG);

    let cardInfoDiv = document.createElement("div");
    cardInfoDiv.className = "cardInfoDiv";
    cardDiv.appendChild(cardInfoDiv);

    let labelName = document.createElement("label");
    labelName.innerHTML = "Name: " + card.title;
    cardInfoDiv.appendChild(labelName);

    let labelLvl = document.createElement("label");
    labelLvl.innerHTML = "Level: " + card.stars;
    cardInfoDiv.appendChild(labelLvl);

    let labelDesc = document.createElement("label");
    labelDesc.innerHTML = "Attribute: " + card.attribute;
    cardInfoDiv.appendChild(labelDesc);

    let labelAttackDeffens = document.createElement("label");
    labelAttackDeffens.innerHTML = `ATK: ${card.attack} DEF: ${card.deffense}`;
    cardInfoDiv.appendChild(labelAttackDeffens);

    let cardButtonDiv = document.createElement("div");
    cardDiv.appendChild(cardButtonDiv);

    let cardDeleteButton = document.createElement("button");
    cardDeleteButton.className = "cardDeleteButton";
    cardDeleteButton.innerHTML = "DELETE";
    mainCardDiv.appendChild(cardDeleteButton);

    cardDiv.onclick = () => {
      this.divClicked(card);
    };

    cardDeleteButton.onclick = () => {
      this.deleteClicked(card);
    };
  }

  divClicked(card: Card) {
    console.log(card.title + " clicked")
    document.getElementById("cardDetail").innerHTML = "";

    let cardDetailDiv = document.createElement("div");
    cardDetailDiv.className = "cardDetailDiv";
    document.getElementById("cardDetail").appendChild(cardDetailDiv);

    let cardDetailImage = document.createElement("img");
    cardDetailImage.src = card.imgPath;
    cardDetailDiv.appendChild(cardDetailImage);
  }

  deleteClicked(card: Card) {
    this.cardCollection.cardCollectionObservable =
      this.cardCollection.deleteCard(card);
    this.drawList();
  }


  clearCardListDiv() {
    document.getElementById("output").innerHTML = "";
  }


}

function clearCardDiv() {
  document.getElementById("output").innerHTML = "";
}

function comboBoxValue() {
  var comboBox = document.getElementsByClassName("comboBoxInput");
  return (<HTMLInputElement>comboBox[0]).value;
}

function sortButton() {
  var sortButton = document.getElementsByClassName("sortCards")[0]
  return fromEvent(sortButton, 'click')
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
