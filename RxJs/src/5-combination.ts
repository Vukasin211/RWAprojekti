import { combineLatest, forkJoin, from, interval, merge, zip } from "rxjs";
import { map, take } from "rxjs/operators";

const stream1 = interval(500).pipe(
    map( x => `prvi ${x}`),
    take(5)
);

const stream2 = interval(1500).pipe(
    map( x => `drugi ${x}`),
    take(7)
);

//forkJoin([stream1, stream2]).subscribe((x) => console.log(`Join: ${x}`));
//zip(stream1, stream2).subscribe((x) => console.log(x));
//combineLatest([stream1, stream2]).subscribe((x) => console.log(x));

merge(stream1, stream2).subscribe((x) => console.log(x));