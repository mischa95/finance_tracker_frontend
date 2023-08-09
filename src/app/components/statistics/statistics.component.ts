import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { PolarAreaChartComponent } from '../polar-area-chart/polar-area-chart.component';


@Component({
  selector: 'app-statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.css']
})
export class StatisticsComponent {

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    
  }

  logout(){
    this.authService.logout(true);
  }
}
