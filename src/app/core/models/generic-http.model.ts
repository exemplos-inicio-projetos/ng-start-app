import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

export abstract class GenericHttp {

    /**
     * Timeout da resposta
     */
    private _timeout = 60000;
    private _url = '';

    constructor(private httpClient: HttpClient) { }

    /**
     * Executa uma requisição POST
     */
    protected post<T = any>(method: string, body: any, options?: OptionsModel): Promise<any | T> {
        return this.httpClient.post<T>(`${this._url}${method}`, body, options)
        .pipe(timeout(this._timeout))
        .toPromise();
    }

    /**
     * Executa uma requisição POST retornando um observable
     */
    protected postObs<T = any>(method: string, body: any, options?: OptionsModel) {
        return this.httpClient.post<T>(`${this._url}${method}`, body, options)
        .pipe(timeout(this._timeout));
    }

    /**
     * Executa uma requisição GET
     */
    protected get<T = any>(method: string, options?: OptionsModel): Promise<any | T> {
        return this.httpClient.get<T>(`${this._url}${method}`, options)
        .pipe(timeout(this._timeout))
        .toPromise();
    }

    /**
     * Executa uma requisição POST
     */
    protected put<T = any>(method: string, body: any, options?: OptionsModel): Promise<any | T> {
        return this.httpClient.put<T>(`${this._url}${method}`, body, options)
        .pipe(timeout(this._timeout))
        .toPromise();
    }

    /**
     * Executa uma requisição DELETE
     */
    protected delete<T = any>(method: string, options?: OptionsModel): Promise<any | T> {
        return this.httpClient.delete<T>(`${this._url}${method}`, options)
        .pipe(timeout(this._timeout))
        .toPromise();
    }

}

class OptionsModel {
    headers?: HttpHeaders | {
        [header: string]: string | string[];
    };
    observe: 'events';
    params?: HttpParams | {
        [param: string]: string | string[];
    };
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
}
