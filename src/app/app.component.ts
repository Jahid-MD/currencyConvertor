import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone:false,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Currency Converter';
  amount: number = 0;
  fromCurrency: string = 'USD';
  toCurrency: string = 'EUR';
  convertedAmount: number | null = null;
  currencies: string[] = ['USD', 'EUR', 'GBP', 'INR', 'JPY'];

  // Mock conversion rates
  conversionRates: { [key: string]: number } = {
    'USD-EUR': 0.85,
    'EUR-USD': 1.18,
    'USD-GBP': 0.75,
    'GBP-USD': 1.33,
    'USD-INR': 74.5,
    'INR-USD': 0.013,
    'USD-JPY': 110.0,
    'JPY-USD': 0.0091,
    // Add more rates as needed
  };

  convertCurrency() {
    const conversionKey = `${this.fromCurrency}-${this.toCurrency}`;
    const rate = this.conversionRates[conversionKey];
    if (rate) {
      this.convertedAmount = this.amount * rate;
    } else {
      this.convertedAmount = null;
      alert('Conversion rate not available.');
    }
  }
}
