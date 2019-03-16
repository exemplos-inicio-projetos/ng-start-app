import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-core-root',
    template: `<app-home></app-home>`,
    styles: [``]
})
export class CoreComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
