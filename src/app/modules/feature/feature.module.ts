import { NgModule } from '@angular/core';

import { SharedModule } from 'shared/shared.module';
import { FeatureRoutingModule } from './feature-routing.module';
import { FeatureRootComponent } from './feature-root.component';
import { featurePages } from './pages';
import { featureComponents } from './components';
import { featureDirectives } from './directives';
import { featurePipes } from './pipes';
import { featureServices } from './services';

/**
 * Este módulo é apenas para servir como base para criação de outro
 */
@NgModule({
    declarations: [
        ... featureComponents,
        ... featureDirectives,
        ... featurePages,
        ... featurePipes,
        FeatureRootComponent
    ],
    imports: [
        FeatureRoutingModule,
        SharedModule
    ],
    entryComponents: [
        ... featurePages
    ],
    providers: [
        ... featureServices
    ]
})
export class FeatureModule { }
