"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

export interface BookingState {
  routeSlug: string | null;
  guideSlug: string | null;
  startDate: string | null;
  travelers: number;
  travelerInfo: {
    name: string;
    email: string;
    phone: string;
    nationality: string;
    specialRequests: string;
  };
}

const initialState: BookingState = {
  routeSlug: null,
  guideSlug: null,
  startDate: null,
  travelers: 1,
  travelerInfo: {
    name: "",
    email: "",
    phone: "",
    nationality: "",
    specialRequests: "",
  },
};

const BookingContext = createContext<{
  booking: BookingState;
  setBooking: (update: Partial<BookingState>) => void;
  resetBooking: () => void;
}>({
  booking: initialState,
  setBooking: () => {},
  resetBooking: () => {},
});

export function BookingProvider({ children }: { children: ReactNode }) {
  const [booking, setState] = useState<BookingState>(initialState);

  const setBooking = (update: Partial<BookingState>) => {
    setState((prev) => ({ ...prev, ...update }));
  };

  const resetBooking = () => {
    setState(initialState);
  };

  return (
    <BookingContext.Provider value={{ booking, setBooking, resetBooking }}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBooking() {
  return useContext(BookingContext);
}
