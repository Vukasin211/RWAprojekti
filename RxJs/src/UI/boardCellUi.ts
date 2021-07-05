import { fromEvent } from "rxjs";
import { Card } from "../models/card";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
const socket = io("http://localhost:4000");

export class BoardCellUi {
  public id: number;
  public card: Card | null;
  public cellContainer: HTMLTableDataCellElement | null;

  constructor(id: number) {
    this.id = id;
    this.card = null;
    this.cellContainer = null;
    this.connect();
  }

  drawCell(boardRow: HTMLTableRowElement) {
    const boardCell = document.createElement("td");
    boardCell.className = "tableBoardCell";
    this.cellContainer = boardCell;
    boardRow.appendChild(boardCell);
    this.clickCell();
  }

  connect() {
    socket.on("connect", () => {
      //console.log(`Conneceted with id: ${this.socket.id}`);
    });
  }

  clickCell() {
    fromEvent(this.cellContainer, "click").subscribe((x) => {
      let card = document.createElement("img");
      this.placeCard(this.cellContainer, card);
    });
  }

  placeCard(boardCell: HTMLTableDataCellElement, card: HTMLImageElement) {
    card.className = "cardImg";
    card.src = "./resorces/CelticGuardian.png";
    socket.emit("send-message", { id: this.id, card });
  }

  boardPlaceCard(id: number, card: HTMLImageElement) {
    let card1 = document.createElement("img");
    card1.className = "cardImg";
    card1.src = "./resorces/CelticGuardian.png";
    this.cellContainer.appendChild(card1);
    console.log(id);
  }
}
