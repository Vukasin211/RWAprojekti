import { BoardUI } from "./UI/boardUI";
import { io } from "socket.io-client";
import { fromEvent } from "rxjs";
import { debounceTime, map } from "rxjs/operators";

const board = new BoardUI(document.body);
board.drawBoard();

const socket = io('http://localhost:4000');

socket.on("connect", () => {
    console.log(`Conneceted with id: ${socket.id}`);
});

socket.on("recive-message", ({id, card}) => {
    board.placeCard(id, card);
})