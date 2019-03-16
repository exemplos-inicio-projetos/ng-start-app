import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericHttp } from 'src/app/core/models/generic-http.model';

@Injectable()
export class SharedHttpService extends GenericHttp {
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient);
    }

    async postTest() {
        const test = await this.get<any>('https://reqres.in/api/users?page=1');
        console.log(test);
    }
}
