import { CalendarClock } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "../components/ui/popover";
import { Calendar } from "../components/ui/calendar";

export function Filter() {
    return(
        <Popover>
              <PopoverTrigger asChild>
                <Button
                  id="date"
                  variant="outline"
                  className="w-[280px] justify-start text-left font-normal"
                >
                  <CalendarClock className="mr-2 h-4 w-4" />
                  Junho 01, 2024 - Junho 30, 2024
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="end">
                <Calendar initialFocus mode="range" numberOfMonths={2} />
              </PopoverContent>
            </Popover>
    )
}