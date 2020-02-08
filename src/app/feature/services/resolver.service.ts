import { Injectable } from '@angular/core';

import { Resolve } from '@angular/router';

@Injectable()
export class ResolverService implements Resolve<Promise<any>> {
    constructor() { }

    resolve() {
        return new Promise<any>((resolve, reject) => {
            try {
                setTimeout(() => {
                    resolve(console.log('Resolver example'));
                }, 100);
            } catch (error) {
                reject(error);
            }
        });
    }
}
