import { Component, OnInit, HostBinding } from '@angular/core';

@Component({
    selector: 'app-core-root',
    template: `
        <nav>NavBar</nav>
        <router-outlet></router-outlet>
    `,
    styles: [``]
})
export class CoreComponent implements OnInit {

    theme: Theme = Theme.light;

    @HostBinding('class.theme-dark') get darkTheme() {
        if (this.theme === Theme.dark) { return true; }
    }

    @HostBinding('class.theme-light') get lightTheme() {
        if (this.theme === Theme.light) { return true; }
    }

    constructor() { }

    ngOnInit(): void { }

}



