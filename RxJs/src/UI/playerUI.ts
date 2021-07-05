import { fromEvent } from "rxjs";
import { map } from "rxjs/operators";
import { Card } from "../models/card";
import { Player } from "../models/player";
import { HandCardUI } from "./handCardUI";

export class PlayerUI {
  public playerMainDiv: HTMLElement;
  public handCardDiv: HandCardUI[] | null = []
  public player: Player;

  constructor(player: Player) {
    this.player = player;
    this.handCardDiv = [];
  }

  drawPlayer(playerDiv: HTMLElement) {
    this.playerMainDiv = document.createElement("div");
    playerDiv.appendChild(this.playerMainDiv);
    this.playerMainDiv.className = "playerMainDiv";
    this.drawHand();
  }

  drawHand() {
    const handDiv = document.createElement("div");
    this.playerMainDiv.appendChild(handDiv);
    //this.playerMainDiv.removeChild(this.playerMainDiv.firstChild);

    this.player.hadnObservable.
    subscribe((hand) => {
      hand.forEach((el, index) => {
        let singleCardDiv = document.createElement("div");
        singleCardDiv.className = "singleCardDiv";
        this.playerMainDiv.appendChild(singleCardDiv);
        this.handCardDiv.push(new HandCardUI(index, el, singleCardDiv))
        this.handCardDiv[index].drawSingleHandCard();
        this.cardSelect(singleCardDiv, index)
      });
    });
  }

  cardSelect(singleCardDiv: HTMLDivElement, index: number)
  {
    fromEvent(singleCardDiv, "ondrag").subscribe((x) => {
        // this.playerMainDiv.removeChild(this.playerMainDiv.);
        alert("");
    });
  }
}
