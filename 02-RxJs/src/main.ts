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


(<HTMLButtonElement>(
  document.getElementsByClassName("forceLoadDbmsButton")[0]
)).onclick = () => {
  cardCollection.cardCollection.loadDbmsCard();
  cardCollection.drawList();
};
