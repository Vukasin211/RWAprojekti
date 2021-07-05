import { fromEvent } from "rxjs";
import { Card } from "../models/card";

export class HandCardUI {
  public id: number;
  public card: Card | null;
  public handCardContainer: HTMLDivElement | null;

  constructor(id: number, card: Card, cardContainer: HTMLDivElement) {
    this.id = id;
    this.card = card;
    this.handCardContainer = cardContainer;
  }

  drawSingleHandCard() {
      let cardImg = document.createElement("img")
      cardImg.className = "cardIMG";
      cardImg.src = this.card.imgPath;
      this.handCardContainer.appendChild(cardImg)
  }

  delete()
  {
      this.handCardContainer.parentNode.removeChild(this.handCardContainer.firstChild);
  }
}

