import { Board } from "../models/board";
import { Card } from "../models/card";

export class BoardUI{

    public boardStorage: Board;
    public boardContainer: HTMLElement;
    public rowClassNames: string[];
    public cellClassNames: string[];
    

    public tempCard: Card;

    constructor(mainContainer: HTMLElement)
    {
        this.boardContainer = mainContainer;
        this.boardContainer.className = "mainBoardContainer";

        this.rowClassNames = ["row1", "row2", "row3", "row4"]
        this.cellClassNames = ["cell1", "cell2", "cell3", "cell4", "cell5"]
    }

    drawBoard()
    {
        const board = document.createElement("table");
        board.className = "tableBoard";
        this.boardContainer.appendChild(board);

        let boardRow: HTMLTableRowElement = null;

        this.rowClassNames.forEach((row, index) =>{
            boardRow = document.createElement("tr");
            boardRow.className = row;
            board.appendChild(boardRow);

            this.cellClassNames.forEach((cell, index) => {
                const boardCell = document.createElement("td");
                boardCell.className = "tableBoardCell";
                boardRow.appendChild(boardCell);


                //Za implementaciju koristiti observable ovo je cisto test izgleda
                boardCell.onclick = () => {
                    console.log(`Ovo je red ${row}, a ovo je celija ${cell}`)
                    let card = document.createElement("img");
                    card.className = "cardImg";
                    card.src = "./resorces/CelticGuardian.png";
                    boardCell.appendChild(card);
                }                
            })
        })
    }

    placeCard()
    {

    }

    drawHand()
    {

    }

}