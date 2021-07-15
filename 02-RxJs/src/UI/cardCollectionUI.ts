import { combineLatest, from, fromEvent, Observable, Subscription, zip } from "rxjs";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";
import { Card } from "../models/card";
import { cardCollectionController } from "../models/cardCollection";

export class cardCollectionUI {
  public cardCollection: cardCollectionController;
  public testSubscription: Subscription;
  public testCards: Card[];

  constructor() {
    this.testCards = [];
    this.cardCollection = new cardCollectionController();
  }

  drawList() {
    document.getElementById("cardDetail").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    this.testSubscription = this.cardCollection.cardCollectionObservable
      .pipe(
        switchMap((cards) => this.cardCollection.searchObservable()),
        //switchMap((cards) => this.testSortButton(cards)),
      )
      .subscribe((cards) => {
        console.log("subscribe")
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

  testSortButton(cards: Card[]) {
      return zip(sortButtonPress(), this.cardCollection.getCardCollectionStream())
      .pipe(
        map((newCards) => this.cardCollection.radnomOrderSorterTest(cards)),
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
    console.log(card.title + " clicked");
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

function sortButtonPress() {
  var sortButton = document.getElementsByClassName("sortCards")[0];
  return fromEvent(document.getElementsByClassName("sortCards")[0], 'click');
}


const sortButtonObservable = new Observable((sortButton) => {
  setInterval(() => {
    sortButton.next(sortButtonPress());
  }, 1000)
})
