import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { timeout } from 'rxjs/operators';

export abstract class GenericHttp {

    private _timeToRetry = 5; // segundos entre uma tentativa e outra
    private _maxRetry = 20; // numero máximo de tentativas
    /**
     * Timeout da resposta
     */
    private _timeout = 60000;

    public get timeToRetry() {
        return (this._timeToRetry * 1000);
    }

    public get maxRetry() {
        return this._maxRetry;
    }

    private _url = '';

    constructor(private httpClient: HttpClient) { }

    /**
     * Executa uma requisição POST
     */
    protected async post<T = any>(method: string, body: any, options?: OptionsModel): Promise<any | T> {
        return await this.httpClient.post<T>(`${this._url}${method}`, body, options)
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
    protected async get<T = any>(method: string, options?: OptionsModel): Promise<any | T> {
        return await this.httpClient.get<T>(`${this._url}${method}`, options).pipe(timeout(this._timeout))
        .pipe(timeout(this._timeout))
        .toPromise();
    }

    /**
     * Executa uma requisição POST
     */
    protected async put<T = any>(method: string, body: any, options?: OptionsModel): Promise<any | T> {
        return await this.httpClient.put<T>(`${this._url}${method}`, body, options)
        .pipe(timeout(this._timeout))
        .toPromise();
    }

    /**
     * Executa uma requisição DELETE
     */
    protected async delete<T = any>(method: string, options?: OptionsModel): Promise<any | T> {
        return await this.httpClient.delete<T>(`${this._url}${method}`, options)
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
