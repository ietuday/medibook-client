import { Component, OnInit } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { ApiService } from './../../services/api.service';

@Component({
  selector: 'medi-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({ transform: 'translateY(-100%)', opacity: 0 }),
          animate('500ms', style({ transform: 'translateX(0)', opacity: 1 }))
        ]),
        transition(':leave', [
          style({ transform: 'translateY(0)', opacity: 1 }),
          animate('500ms', style({ transform: 'translateY(-100%)', opacity: 0 }))
        ])
      ]
    )
  ],
})
export class SidenavComponent implements OnInit {

  showItems: boolean;
  menuItems = [{
    title: 'Dashboard',
    routeLink: '/dashboard',
    icon: 'dashboard'
  },

  ];

  selectedMenu = this.menuItems[1];

  constructor(private api: ApiService) { }

  ngOnInit() {
    this.loadCourseMenus();
  }

  private loadCourseMenus(): void {
  }
}
