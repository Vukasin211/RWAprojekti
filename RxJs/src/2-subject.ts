import { interval, Observable, range, Subject } from "rxjs";
import { filter, map, take, takeUntil } from "rxjs/operators";

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

function createInterval(controlObservable: Subject<any>)
{
    interval(500).pipe(
        map(x => x + 3),
        takeUntil(subject)
    ).subscribe(x => console.log("Interval broj " + x));
}

function stopEmitingWithDelay(sub: Subject<any>)
{
    console.log("stop sequence started");
    setTimeout(() => {
        sub.next("STOP");
        sub.complete();
    }, 2000)
}

const subject = new Subject();
subject.subscribe(x => console.log(`iz subjekta ${x}`));

createInterval(subject);
createStopButton(() => stopEmitingWithDelay(subject)); 