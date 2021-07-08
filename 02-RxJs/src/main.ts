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
  //api
  return from(fetchVar);
}

const cardGetSubscription = getAllCardsObservableFromJsonServer(
  "",
  ""
).subscribe((x) => {
  x.forEach((el, index) => {
    addItem(el);
  });
});

function clearCardDiv() {
  document.getElementById("output").innerHTML = "";
}

const keyboadInputObservable = fromEvent(
  document.getElementsByClassName("searchInput"),
  "input"
).pipe(
  debounceTime(1000),
  map((ev: InputEvent) => (<HTMLInputElement>ev.target).value)
  //filter((text) => text.length >= 3)
);

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
  }, 500);
});

const keyboardInpuObservable = new Observable((input) => {
  setInterval(() => {
    input.next(keyboardValue());
  }, 500);
});

combineLatest([comboBoxObservable, keyboardInpuObservable])
  .pipe(
    switchMap((card) =>
      getAllCardsObservableFromJsonServer(<string>card[1], <string>card[0])
    )
  )
  .subscribe((x) => {
    if (x[0] !== undefined) {
      if (x[0].title !== "") {
        clearCardDiv();
        x.forEach((el) => {
          addItem(el);
        });
      }
    }
  });
