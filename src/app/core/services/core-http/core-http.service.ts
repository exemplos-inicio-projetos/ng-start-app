import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { GenericHttp } from 'src/app/core/models/generic-http.model';

@Injectable()
export class CoreHttpService extends GenericHttp {
    constructor(
        private _httpClient: HttpClient
    ) {
        super(_httpClient);
    }
}
