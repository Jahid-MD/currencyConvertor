import { TestBed, ComponentFixture } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      imports: [FormsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the title "Currency Converter"', () => {
    expect(component.title).toEqual('Currency Converter');
  });

  it('should initialize with default values', () => {
    expect(component.amount).toBe(0);
    expect(component.fromCurrency).toBe('USD');
    expect(component.toCurrency).toBe('EUR');
    expect(component.convertedAmount).toBeNull();
    expect(component.currencies).toEqual(['USD', 'EUR', 'GBP', 'INR', 'JPY']);
  });

  it('should convert currency correctly', () => {
    component.amount = 100;
    component.fromCurrency = 'USD';
    component.toCurrency = 'EUR';
    component.convertCurrency();
    expect(component.convertedAmount).toBe(85); // 100 * 0.85
  });

  it('should handle unavailable conversion rates', () => {
    component.amount = 100;
    component.fromCurrency = 'USD';
    component.toCurrency = 'XYZ'; // Non-existent currency
    spyOn(window, 'alert');
    component.convertCurrency();
    expect(component.convertedAmount).toBeNull();
    expect(window.alert).toHaveBeenCalledWith('Conversion rate not available.');
  });

  it('should render the title in the DOM', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain('Currency Converter');
  });

  it('should display the converted amount in the DOM', () => {
    component.amount = 100;
    component.fromCurrency = 'USD';
    component.toCurrency = 'EUR';
    component.convertCurrency();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h2')?.textContent).toContain('Converted Amount: 85');
  });

  it('should update the converted amount when inputs change', () => {
    component.amount = 200;
    component.fromCurrency = 'USD';
    component.toCurrency = 'GBP';
    component.convertCurrency();
    expect(component.convertedAmount).toBe(150); // 200 * 0.75
  });
});