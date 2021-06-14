import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { routeTransitionAnimations } from './route-transition-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routeTransitionAnimations]
})
export class AppComponent {
  title = 'Movies';
  constructor(private router: Router) { }
  ngOnInit() {
    if (localStorage.getItem('token')) {
      this.router.navigate(['/movies']);
    }
    else {
      this.router.navigate(['/login']);
    }
  }
  prepareRoute(outlet: RouterOutlet) {
    return outlet &&
      outlet.activatedRouteData &&
      outlet.activatedRouteData['animationState'];
  }
}
