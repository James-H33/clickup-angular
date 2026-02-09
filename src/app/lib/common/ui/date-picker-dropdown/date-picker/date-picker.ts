import { DatePipe } from "@angular/common";
import { Component, input, output } from "@angular/core";
import { CalendarComponent } from "../calendar/calendar";
import { InputModule } from "@common/ui/input/input.module";

@Component({
  selector: 'cu-date-picker',
  templateUrl: './date-picker.html',
  styleUrls: ['./date-picker.scss'],
  imports: [
    DatePipe,
    CalendarComponent,
    InputModule
  ],
})
export class DatePickerComponent {
  date = input<number>();

  dateChanged = output<{ date: number }>();
}
