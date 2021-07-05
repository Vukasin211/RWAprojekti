import { Player } from "./player";

export class Board{

    public countDown: number;
    public player1: Player;
    public player2: Player;
    
    constructor()
    {
        this.player1 = new Player("Player1");
        this.player2 = new Player("Player2");
    }
}