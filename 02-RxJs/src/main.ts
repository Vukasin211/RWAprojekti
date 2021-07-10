import { title } from "process";
import {
  combineLatest,
  from,
  fromEvent,
  interval,
  Observable,
  Subject,
  zip,
} from "rxjs";
import {
  debounceTime,
  filter,
  map,
  repeat,
  switchMap,
  take,
  takeUntil,
  throttleTime,
} from "rxjs/operators";
import { Card } from "./models/card";
import { cardCollectionController } from "./models/cardCollection";
import { cardCollectionUI } from "./UI/cardCollectionUI";


const cardCollection = new cardCollectionUI();
cardCollection.drawList();

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

cardCollection.search(comboBoxObservable, keyboardInpuObservable);

(<HTMLButtonElement>document.getElementsByClassName("forceLoadDbmsButton")[0]).onclick = () => {
  cardCollection.cardCollection.loadDbmsCard();
  cardCollection.drawList();
}
















// function addItem(card: Card) {
//   let cardDiv = document.createElement("div");
//   document.getElementById("output").appendChild(cardDiv);
//   cardDiv.className = "cardUiStyle";
//   cardDiv.id = "test";

//   let cardIMG = document.createElement("img");
//   cardIMG.src = card.imgPath;
//   cardIMG.className = "cardUiImg";
//   cardDiv.appendChild(cardIMG);

//   let cardInfoDiv = document.createElement("div");
//   cardInfoDiv.className = "cardInfoDiv";
//   cardDiv.appendChild(cardInfoDiv);

//   let labelName = document.createElement("label");
//   labelName.innerHTML = "Name: " + card.title;
//   cardInfoDiv.appendChild(labelName);

//   let labelLvl = document.createElement("label");
//   labelLvl.innerHTML = "Level: " + card.stars;
//   cardInfoDiv.appendChild(labelLvl);

//   let labelDesc = document.createElement("label");
//   labelDesc.innerHTML = "Attribute: " + card.attribute;
//   cardInfoDiv.appendChild(labelDesc);

//   let labelAttackDeffens = document.createElement("label");
//   labelAttackDeffens.innerHTML = `ATK: ${card.attack} DEF: ${card.deffense}`;
//   cardInfoDiv.appendChild(labelAttackDeffens);

//   cardDiv.onclick = () => {
//     divClicked(card);
//   }
// }


// function divClicked(card: Card)
// {
//   document.getElementById("cardDetail").innerHTML = "";

//   let cardDetailDiv = document.createElement("div");
//   cardDetailDiv.className = "cardDetailDiv";
//   document.getElementById("cardDetail").appendChild(cardDetailDiv);

//   let cardDetailImage = document.createElement("img")
//   cardDetailImage.src = card.imgPath;
//   cardDetailDiv.appendChild(cardDetailImage);
// }

// function showDetailedCardView(card: Card)
// {
//   console.log(card)
//   let detailCardDiv = document.createElement("img");
//   detailCardDiv.src = card.imgPath;
//   document.getElementById("cardDetail").appendChild(detailCardDiv);
// }

// function getAllCardsObservableFromJsonServer(
//   searched: string,
//   type: string
// ): Observable<Card[]> {
//   type = type.toLowerCase();
//   if (searched === "") {
//     var fetchApi = fetch(API_URL + "cards");
//   } //?title=Celtic%20Guardian
//   else {
//     var fetchApi = fetch(API_URL + "cards" + `?${type}=` + searched);
//   }
//   var fetchVar = fetchApi
//     .then((response) => {
//       if (!response.ok) {
//         throw new Error("Cards not found");
//       } else {
//         return response.json();
//       }
//     })
//     .catch((err) => console.log(`Error `, err));
//   return from(fetchVar);
// }

// const cardGetSubscription = getAllCardsObservableFromJsonServer(
//   "",
//   ""
// ).subscribe((x) => {
//   x.forEach((el, index) => {
//     addItem(el);
//   });
// });

// function clearCardDiv() {
//   document.getElementById("output").innerHTML = "";
// }


