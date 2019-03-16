import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { SharedHttpService } from 'shared/services';
import { DynamicComponentCreatorService } from 'core/services';

@Component({
  selector: 'app-feature-root',
  templateUrl: './feature-root.component.html',
  styleUrls: ['./feature-root.component.scss']
})
export class FeatureRootComponent implements OnInit {

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _sharedHttp: SharedHttpService,
    private _viewContainerRef: ViewContainerRef,
    private _dynamicComponentCreator: DynamicComponentCreatorService
  ) {

  }

  ngOnInit() {
    this._dynamicComponentCreator.defineRootContainerRef(this._viewContainerRef);
    console.log('Route Snapshot: ', this._activatedRoute.snapshot);
    console.log('QueryParams: ', this._activatedRoute.snapshot.queryParams);
    console.log('Params :', this._activatedRoute.snapshot.params);
    this._sharedHttp.postTest();
  }

  navToHome() {
    this._router.navigate(['']);
  }

}
