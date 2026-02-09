import { DatePipe } from "@angular/common";
import { Component, effect, signal } from "@angular/core";
import moment from "moment";

@Component({
  selector: 'cu-calendar',
  templateUrl: './calendar.html',
  styleUrls: ['./calendar.scss'],
  imports: [
    DatePipe
  ]
})
export class CalendarComponent {

  today = moment();

  currentMonth = signal(this.today.toDate());

  currentYear = signal(this.today.toDate());

  weeks = signal<moment.Moment[][]>([]);

  constructor() {
    effect(() => {
      this.weeks.set(this.getWeeks());
    });
  }

  getWeeks(): moment.Moment[][] {
    const days = this.getDays();
    const weeks: moment.Moment[][] = [];
    const weeksCount = Math.ceil(days.length / 7);

    for (let i = 0; i < weeksCount; i++) {
      const start = i * 7;
      const end = start + 7;
      weeks.push(days.slice(start, end));
    }

    return weeks;
  }

  getDays(): moment.Moment[] {
    const daysArray: moment.Moment[] = [];

    const firstDateOfMonth = this.today.clone().startOf('month');
    const firstMonday = firstDateOfMonth.clone().startOf('week');
    const daysToAdd = 6 * 7; // 6 weeks to cover all possible month lengths
    let remainingDaysToAdd = daysToAdd;

    for (let i = 0; i < remainingDaysToAdd; i++) {
      daysArray.push(firstMonday.clone().add(i, 'day'));
    }

    return daysArray;
  }
}
