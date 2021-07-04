import { from } from "rxjs";
import { filter, pairwise, scan } from "rxjs/operators";

const number$ = from([1, -4, 3, 7, -5, 4, 7, 8, -3, -2, 6]);

number$.pipe(
    filter(number => number > 0),
    //pairwise(),
    scan((acc, broj) => acc + broj)
).subscribe( (x) => console.log("broj: " + x))