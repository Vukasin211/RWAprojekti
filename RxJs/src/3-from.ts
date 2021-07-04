import { from, fromEvent, Observable } from "rxjs";
import { debounce, debounceTime, filter, map, sampleTime, switchMap } from "rxjs/operators";
import { Movie } from "./models/movies";

const API_URL = "http://localhost:3000/";

interface MouseCoordinates
{
    x: number;
    y: number;
}

function getMoviesObservableByTitle(title: string): Observable<Movie[]>
{
    console.log(`fetching movie with title ${title}`);
    return from(
        fetch(`${API_URL}movies/?title=${title}`).then((response) =>{
        if(response.ok)
        {
            console.log(response.json());
            return response.json();
        }
        else
        {
            //throw new Error("Movie not found");
        }
        }).catch((err) => console.log("Error " + err))
    )
}

function logMouse(){
    fromEvent(document, "mousemove").pipe(
        sampleTime(1000),
        map((ev: MouseEvent) => ({
            x: ev.screenX,
            y: ev.screenY
        }))
    ).subscribe((coords: MouseCoordinates) => console.log(`Mouse coordinates X: ${coords.x} and Y: ${coords.y}`))
}

function logKeyboard(){
    let input = document.createElement("input");
    document.body.appendChild(input);
    fromEvent(input, "input").pipe(
        debounceTime(1000),
        map((ev: InputEvent) => (<HTMLInputElement>ev.target).value),
        filter(text => text.length >= 3),
        switchMap(title => getMoviesObservableByTitle(title))
        //map(movies => movies[0])
    ).subscribe((movie: Movie[]) => console.log(movie))
}

//logMouse();
logKeyboard();
