
import { KorisnikState } from "./korisnik/korisnik.reducer";
import { LokalState } from "./lokal/lokal.reducer";

export interface AppState
{
    lokali: LokalState
    korisnik: KorisnikState
}