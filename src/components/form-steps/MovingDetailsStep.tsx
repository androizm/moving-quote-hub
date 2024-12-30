import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { MapPin, CalendarIcon, Ruler } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useState } from "react";
import { DateRange } from "react-day-picker";

interface MovingDetailsStepProps {
  formData: {
    fromAddress: string;
    toAddress: string;
    moveDateStart: string;
    moveDateEnd: string;
    livingSpaceSqm: string;
  };
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MovingDetailsStep = ({ formData, onChange }: MovingDetailsStepProps) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: formData.moveDateStart ? new Date(formData.moveDateStart) : undefined,
    to: formData.moveDateEnd ? new Date(formData.moveDateEnd) : undefined,
  });

  const handleDateSelect = (range: DateRange | undefined) => {
    setDate(range);
    if (range?.from) {
      const event = {
        target: {
          name: 'moveDateStart',
          value: format(range.from, 'yyyy-MM-dd')
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
    if (range?.to) {
      const event = {
        target: {
          name: 'moveDateEnd',
          value: format(range.to, 'yyyy-MM-dd')
        }
      } as React.ChangeEvent<HTMLInputElement>;
      onChange(event);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="space-y-2">
        <Label htmlFor="fromAddress">Current Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="fromAddress"
            name="fromAddress"
            className="pl-10"
            placeholder="Enter your current address"
            value={formData.fromAddress}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="toAddress">New Address</Label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="toAddress"
            name="toAddress"
            className="pl-10"
            placeholder="Enter your new address"
            value={formData.toAddress}
            onChange={onChange}
            required
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label>Move Dates</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>Pick your move dates</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={{ before: new Date() }}
            />
          </PopoverContent>
        </Popover>
      </div>
      <div className="space-y-2">
        <Label htmlFor="livingSpaceSqm">Living Space (m²)</Label>
        <div className="relative">
          <Ruler className="absolute left-3 top-3 h-4 w-4 text-gray-500" />
          <Input
            id="livingSpaceSqm"
            name="livingSpaceSqm"
            type="number"
            className="pl-10"
            placeholder="Enter living space in square meters"
            value={formData.livingSpaceSqm}
            onChange={onChange}
            required
            min="1"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
};