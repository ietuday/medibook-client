import { Component, OnInit } from '@angular/core';
import Scrollbar from 'smooth-scrollbar';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'medi-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  showLoading = false;
  currentBreadcrumb: any;

  constructor(private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    setTimeout(Scrollbar.initAll(), 200);
  }

  onActivate($event, scrollContainer) {

    // grab the breadcrumb info from route to display on page
    this.currentBreadcrumb = this.activatedRoute.snapshot.firstChild.data['breadcrumb'];


    // scroll top to top on route nagivation
    const scrollbar = Scrollbar.get(scrollContainer);
    if (scrollbar) {
      scrollbar.scrollTo(0, 0, 300);
    }
  }

  isLastLink(index) {
    return index + 1 >= this.currentBreadcrumb.links.length;
  }
}
