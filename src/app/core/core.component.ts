import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-core-root',
    template: `
        <nav>NavBar</nav>
        <router-outlet></router-outlet>
    `,
    styles: [``]
})
export class CoreComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }
}
