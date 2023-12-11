import { Component } from '@angular/core';
import { ChartData, ChartEvent, ChartType } from 'chart.js';
import { CategoryDTO } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';
import { ExpenseService } from 'src/app/services/expense.service';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.css']
})
export class PolarAreaChartComponent {

  categories: CategoryDTO[] = [];
  percentages: number[] = [];
  public polarAreaChartData: ChartData<'polarArea'>
  
  constructor(private expenseService: ExpenseService, private categoryService: CategoryService) {}

  ngOnInit() {
    // TODO nie wysyłać requestow w pętli -> zrobić endpointa ktory przyjmuje liste categoryId i zwraca liste
    for (let i = 1; i <= this.polarAreaChartLabels.length; i++){
      this.expenseService.getCategoryPercentage(i).subscribe(
        (data) => {
          this.percentages.push(data);
          this.polarAreaChartData = {
            labels: this.polarAreaChartLabels,
            datasets: [
              {
                data: this.percentages,
                label: 'Series 1',
              },
            ],
          };
        })
    } 
  }

  public polarAreaChartLabels: string[] = [
    'Groceries',
    'Bills',
    'Household',
    'Clothing',
    'Dining out',
    'Alcohol',
    'Transportation',
  ]; 

  // public polarAreaChartData: ChartData<'polarArea'> = {
  //   labels: this.polarAreaChartLabels,
  //   datasets: [
  //     {
  //       data: this.percentages,
  //       label: 'Series 2',
  //     },
  //   ],
  // };
  public polarAreaLegend = true;

  public polarAreaChartType: ChartType = 'polarArea';

  public chartClicked({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  public chartHovered({
    event,
    active,
  }: {
    event: ChartEvent;
    active: object[];
  }): void {
    console.log(event, active);
  }

  listCategories() {
    this.categoryService.getCategories().subscribe(
      data => this.categories = data
    )
  }
}
