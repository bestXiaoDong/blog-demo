import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-test',
    templateUrl: './test.component.html'
})

export class TestComponent implements OnInit{
    packages$: Observable<any>;
    searchText$ = new Subject<any>();

    constructor(
        private http: HttpClient
    ) {

    }

    ngOnInit() {
        this.packages$ = this.searchText$.pipe(
            debounceTime(500),
            distinctUntilChanged(),
            switchMap(() => {
                return this.http.get('../../assets/mock/_mock.json');
            })
        )

        this.packages$.subscribe(data => {
            console.log(data);
        })
    }

    searchText(val) {
        this.searchText$.next(val);
    }

}