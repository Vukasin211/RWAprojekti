import { fromEvent } from "rxjs";
import { io, Socket } from "socket.io-client";
import { DefaultEventsMap } from "socket.io-client/build/typed-events";
import { Board } from "../models/board";
import { Card } from "../models/card";
import { Player } from "../models/player";
import { BoardCellUi } from "./boardCellUi";
import { PlayerUI } from "./playerUI";

export class BoardUI {
  public boardCell: BoardCellUi[];
  public player1uI: PlayerUI;
  public player2uI: PlayerUI;

  public boardContainer: HTMLElement;
  public rowClassNames: string[];
  public cellClassNames: string[];
  public socket: Socket<DefaultEventsMap, DefaultEventsMap>;

  public boardStorage: Board;

  constructor(mainContainer: HTMLElement) {
    this.boardContainer = mainContainer;
    this.boardContainer.className = "mainBoardContainer";
    this.boardCell = [];

    this.boardStorage = new Board();

    this.rowClassNames = ["row1", "row2", "row3", "row4"];
    this.cellClassNames = ["cell1", "cell2", "cell3", "cell4", "cell5"];
  }

  send(boardCell: HTMLTableDataCellElement, card: HTMLImageElement) {
    this.socket.emit("send-message", { boardCell, card });
  }

  recive() {
    this.socket.on("recive-messasge", ({ boardCell, card }) => {
      boardCell.appendChild(card);
      alert("nesto");
    });
  }

  drawBoard() {
    this.drawPlayer(this.boardStorage.player2);

    const board = document.createElement("table");
    board.className = "tableBoard";
    this.boardContainer.appendChild(board);
    let index = 0;
    let boardRow: HTMLTableRowElement = null;

    this.rowClassNames.forEach((row, rowIndex) => {
      boardRow = document.createElement("tr");
      boardRow.className = row;
      board.appendChild(boardRow);

      this.cellClassNames.forEach((cell, cellIndex) => {
        let newBoardCell = new BoardCellUi(index);
        this.boardCell.push(<BoardCellUi>newBoardCell);
        this.boardCell[index].drawCell(boardRow);
        index++;
      });
    });

    this.drawPlayer(this.boardStorage.player1);
  }

  //EventListener za click na celiju
  placeCard(id: number, card: HTMLImageElement) {
    this.boardCell[id].boardPlaceCard(id, card);
  }

  drawPlayer(player: Player) {
      this.player1uI = new PlayerUI(player);
      this.player1uI.drawPlayer(this.boardContainer);
  }
}
