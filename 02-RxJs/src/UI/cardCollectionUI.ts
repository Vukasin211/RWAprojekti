import { combineLatest, fromEvent, Observable } from "rxjs";
import { debounceTime, filter, map, switchMap } from "rxjs/operators";
import { Card } from "../models/card";
import { cardCollectionController } from "../models/cardCollection";

export class cardCollectionUI {
  public cardCollection: cardCollectionController;

  constructor() {
    this.cardCollection = new cardCollectionController();
  }

  drawList() {
      document.getElementById("cardDetail").innerHTML = "";
    document.getElementById("output").innerHTML = "";
    this.cardCollection.cardCollectionObservable.subscribe((cards) => {
      cards.forEach((card, index) => {
        this.addItem(card);
      });
    });
  }

  addItem(card: Card) {
    let cardDiv = document.createElement("div");
    document.getElementById("output").appendChild(cardDiv);
    cardDiv.className = "cardUiStyle";
    cardDiv.id = "test";

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
    cardButtonDiv.appendChild(cardDeleteButton);

    cardDiv.onclick = () => {
      this.divClicked(card);
    };

    cardDeleteButton.onclick = () => {
      this.deleteClicked(card);
    };
  }

  divClicked(card: Card) {
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

  search(comboBoxObservable: Observable<any>, keyboardInpuObservable: Observable<any>) {
        combineLatest([comboBoxObservable, keyboardInpuObservable])
      .pipe(
        switchMap(
          (card) => this.cardCollection.search(<string>card[1], <string>card[0])
          //getAllCardsObservableFromJsonServer(<string>card[1], <string>card[0])
        )
      )
      .subscribe((x) => {
        if (x[0] !== undefined) {
          if (x[0].title !== "") {
            clearCardDiv();
            x.forEach((el) => {
              this.addItem(el);
            });
          }
        }
      });
  }
}

function clearCardDiv() {
  document.getElementById("output").innerHTML = "";
}



// const keyboadInputObservable = fromEvent(
//   document.getElementsByClassName("searchInput"),
//   "input"
// ).pipe(
//   debounceTime(1000),
//   map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
//   filter(text => text.length >= 3)
// );

// function comboBoxValue() {
//   var comboBox = document.getElementsByClassName("comboBoxInput");
//   return (<HTMLInputElement>comboBox[0]).value;
// }

// function keyboardValue() {
//   var inputBox = document.getElementsByClassName("searchInput");
//   return (<HTMLInputElement>inputBox[0]).value;
// }

// const comboBoxObservable = new Observable((comboBox) => {
//   setInterval(() => {
//     comboBox.next(comboBoxValue());
//   }, 500);
// });

// const keyboardInpuObservable = new Observable((input) => {
//   setInterval(() => {
//     input.next(keyboardValue());
//   }, 500);
// });
