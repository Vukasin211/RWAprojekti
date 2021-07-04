import { interval, Observable, range, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

// function execRange() 
// {
//     range(1, 100).pipe(
//         filter( x => x % 2 === 0),
//         map(x => x + 2)
//     ).subscribe(
//         x => console.log(`Ovo je neki broj iz opsega ${x}`)
//     )
// }

// function execInterval()
// {
//     interval(500).pipe(
//         take(20)
//     ).subscribe(x => console.log(`Ovo je neki broj iz intervala ${x}`));
// }

function createStopButton(onClick: Function)
{
    const button = document.createElement("button");
    document.body.appendChild(button);
    button.innerHTML = "Stop!";
    button.onclick = () => {
        onClick();
        button.disabled = true;
    }
}

// const numbersObservable = new Observable((generator) => {
//     setInterval(() => {
//         generator.next(Math.round(Math.random() * 20));
//     },500);
// });

// const currentSubscription = numbersObservable.subscribe( x => console.log(`Ovo je broj generatora ${x}`));

// createStopButton( () => currentSubscription.unsubscribe());