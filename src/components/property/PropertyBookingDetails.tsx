import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { addDays, differenceInDays } from "date-fns";
import { CalendarIcon } from "lucide-react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";

interface PropertyBookingDetailsProps {
  price: string;
  whatsapp?: string | null;
  title: string;
}

export const PropertyBookingDetails = ({
  price,
  whatsapp,
  title,
}: PropertyBookingDetailsProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [adults, setAdults] = useState("1");
  const [children, setChildren] = useState("0");

  const handleBookNow = () => {
    if (!whatsapp || !checkIn || !checkOut) return;

    const nights = differenceInDays(checkOut, checkIn);
    const totalPrice = parseInt(price) * nights;
    const message = `Hello, I'm interested in booking "${title}"\n\nCheck-in: ${format(
      checkIn,
      "PP"
    )}\nCheck-out: ${format(checkOut, "PP")}\nAdults: ${adults}\nChildren: ${children}\nTotal nights: ${nights}\nTotal price: ${totalPrice.toLocaleString()} FCFA`;

    window.open(
      `https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  return (
    <div className="space-y-4 p-6 bg-secondary/20 rounded-lg">
      <h3 className="text-lg font-semibold">Book Your Stay</h3>
      
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm">Check-in</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkIn && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkIn ? format(checkIn, "PP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkIn}
                onSelect={setCheckIn}
                disabled={(date) =>
                  date < new Date() || (checkOut ? date >= checkOut : false)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm">Check-out</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !checkOut && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {checkOut ? format(checkOut, "PP") : "Select date"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={checkOut}
                onSelect={setCheckOut}
                disabled={(date) =>
                  !checkIn || date <= checkIn || date < addDays(checkIn, 1)
                }
              />
            </PopoverContent>
          </Popover>
        </div>

        <div className="space-y-2">
          <label className="text-sm">Adults</label>
          <Select value={adults} onValueChange={setAdults}>
            <SelectTrigger>
              <SelectValue placeholder="Select number of adults" />
            </SelectTrigger>
            <SelectContent>
              {[1, 2, 3, 4, 5, 6].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Adult" : "Adults"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm">Children</label>
          <Select value={children} onValueChange={setChildren}>
            <SelectTrigger>
              <SelectValue placeholder="Select number of children" />
            </SelectTrigger>
            <SelectContent>
              {[0, 1, 2, 3, 4].map((num) => (
                <SelectItem key={num} value={num.toString()}>
                  {num} {num === 1 ? "Child" : "Children"}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {checkIn && checkOut && (
        <div className="pt-4 border-t">
          <div className="flex justify-between mb-2">
            <span>
              {differenceInDays(checkOut, checkIn)} nights x{" "}
              {parseInt(price).toLocaleString()} FCFA
            </span>
            <span>
              {(
                parseInt(price) * differenceInDays(checkOut, checkIn)
              ).toLocaleString()}{" "}
              FCFA
            </span>
          </div>
          <Button 
            className="w-full" 
            onClick={handleBookNow}
            disabled={!whatsapp}
          >
            Book via WhatsApp
          </Button>
        </div>
      )}
    </div>
  );
};