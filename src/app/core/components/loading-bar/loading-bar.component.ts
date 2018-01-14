import { Component, OnInit } from '@angular/core';
import { ISubscription } from 'rxjs/Subscription';
import { LoadingBarService } from './../loading-bar/loading-bar.service';

@Component({
  selector: 'medi-loading-bar',
  templateUrl: './loading-bar.component.html',
  styleUrls: ['./loading-bar.component.scss']
})
export class LoadingBarComponent implements OnInit {

  showLoading = false;

  constructor(private loadingService: LoadingBarService) { }

  ngOnInit() {
    this.loadingService
      .loadingSubscription
      .subscribe(isLoading => this.showLoading = isLoading)
  }

}
