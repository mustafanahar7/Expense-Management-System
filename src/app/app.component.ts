import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ExMangSysComponent } from './MyComponent/ex-mang-sys/ex-mang-sys.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ExMangSysComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ExpensesManagementSystem';
}
