import { title } from "process";
import { from, fromEvent, interval, Observable, Subject } from "rxjs";
import {
  debounceTime,
  filter,
  map,
  switchMap,
  take,
  takeUntil,
  throttleTime,
} from "rxjs/operators";
import { Card } from "./models/card";

const API_URL = "http://localhost:3000/";

function addItem(card: Card) {
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
  labelDesc.innerHTML = "Description: " + card.description;
  cardInfoDiv.appendChild(labelDesc);

  let labelAttackDeffens = document.createElement("label");
  labelAttackDeffens.innerHTML = `ATK: ${card.attack} DEF: ${card.deffense}`;
  cardInfoDiv.appendChild(labelAttackDeffens);
  //fromEvent(cardDiv, "click").subscribe((x) => alert(card.title));
}

function getAllCardsObservableFromJsonServer(
  searched: string
): Observable<Card[]> {
  if (searched === "") {
    var fetchApi = fetch(API_URL + "cards");
  } //?title=Celtic%20Guardian
  else {
    var fetchApi = fetch(API_URL + "cards" + "?title=" + searched);
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
  //api
  return from(fetchVar);
}

const cardGetSubscription = getAllCardsObservableFromJsonServer("").subscribe(
  (x) => {
    x.forEach((el, index) => {
      addItem(el);
    });
  }
);

function clearCardDiv() {
  document.getElementById("output").innerHTML = "";
}

keyboardInput();
searchButtonPressed();

function keyboardInput() {
  fromEvent(document.getElementsByClassName("searchInput"), "input")
    .pipe(
      debounceTime(1000),
      map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
      filter((text) => text.length >= 3),
      switchMap((title) => getAllCardsObservableFromJsonServer(title)),
      map((card) => card[0])
    )
    .subscribe((x) => {
      cardGetSubscription.unsubscribe;
      clearCardDiv();
      if (x !== undefined) {
        addItem(x);
      } else {
        alert("Card not found");
      }
    });
}
function searchButtonPressed() {
  (<HTMLButtonElement>(
    document.getElementsByClassName("searchButton")[0]
  )).onclick = () => {};
}
