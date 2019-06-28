import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { DynamicComponent } from './components';
import { sharedServices } from './services';
import { sharedComponents } from './components';
import { sharedDirectives } from './directives';
import { sharedPipes } from './pipes';
import { sharedPages } from './pages';
import { CustomHttpInterceptor } from '../interceptors/custom-http.interceptor';

/**
 * Variável utilizada para importar os módulos em um só lugar
 */
const defaultModules = [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
];

@NgModule({
    declarations: [
        ...sharedComponents,
        ...sharedDirectives,
        ...sharedPipes,
        ...sharedPages
    ],
    imports: [
        ...defaultModules
    ],
    exports: [
        ...defaultModules,
        ...sharedComponents,
        ...sharedDirectives,
        ...sharedPipes,
        ...sharedPages
    ],
    entryComponents: [
        DynamicComponent
    ],
    providers: [
        ...sharedServices,
        { provide: HTTP_INTERCEPTORS, useClass: CustomHttpInterceptor, multi: true }
    ]
})
export class SharedModule { }
