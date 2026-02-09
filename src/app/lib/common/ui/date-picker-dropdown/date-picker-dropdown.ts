import { Component, input, output } from "@angular/core";
import { DropdownMenuComponent } from "../dropdown-menu/dropdown-menu";
import { DatePickerComponent } from "./date-picker/date-picker";

@Component({
  selector: 'cu-date-picker-dropdown',
  templateUrl: './date-picker-dropdown.html',
  styleUrls: ['./date-picker-dropdown.scss'],
  imports: [
    DropdownMenuComponent,
    DatePickerComponent
  ],
})
export class DatePickerDropdownComponent {
  date = input<number>();

  dateChanged = output<{ date: number }>();

  isOpen = input<boolean>();
}
