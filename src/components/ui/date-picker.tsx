"use client";

import React, { useState, useRef, useEffect } from 'react';
import { CalendarIcon, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (value: string) => void;
}

const MONTHS = ['January','February','March','April','May','June','July','August','September','October','November','December'];
const WEEKDAYS = ['Su','Mo','Tu','We','Th','Fr','Sa'];

function getDaysInMonth(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const daysInPrevMonth = new Date(year, month, 0).getDate();
  const days: { day: number; isCurrentMonth: boolean; disabled: boolean }[] = [];
  // Prev month
  for (let i = firstDay - 1; i >= 0; i--) {
    days.push({ day: daysInPrevMonth - i, isCurrentMonth: false, disabled: true });
  }
  // Current month
  const today = new Date();
  for (let d = 1; d <= daysInMonth; d++) {
    const date = new Date(year, month, d);
    const disabled = date < new Date(today.getFullYear(), today.getMonth(), today.getDate());
    days.push({ day: d, isCurrentMonth: true, disabled });
  }
  // Next month fill
  const remaining = 42 - days.length;
  for (let d = 1; d <= remaining; d++) {
    days.push({ day: d, isCurrentMonth: false, disabled: true });
  }
  return days;
}

export default function DatePicker({ value, onChange }: DatePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [viewDate, setViewDate] = useState(() => {
    const now = new Date();
    return { year: now.getFullYear(), month: now.getMonth() };
  });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setIsOpen(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const days = getDaysInMonth(viewDate.year, viewDate.month);
  const displayDate = value || '';
  const selectedParts = displayDate.split('/');

  const handleSelect = (day: number) => {
    const m = String(viewDate.month + 1).padStart(2, '0');
    const d = String(day).padStart(2, '0');
    onChange(`${m}/${d}/${viewDate.year}`);
    setIsOpen(false);
  };

  const prevMonth = () => setViewDate(v => v.month === 0 ? { year: v.year - 1, month: 11 } : { year: v.year, month: v.month - 1 });
  const nextMonth = () => setViewDate(v => v.month === 11 ? { year: v.year + 1, month: 0 } : { year: v.year, month: v.month + 1 });

  return (
    <div className="relative" ref={ref}>
      <button type="button" onClick={() => setIsOpen(!isOpen)} className="w-full flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3.5 py-2.5 text-xs text-gray-700 hover:border-gray-300 transition-colors">
        <CalendarIcon className="w-4 h-4 text-gray-400 stroke-[1.5]" />
        <span className={displayDate ? "text-gray-900 font-medium" : "text-gray-400 font-light"}>
          {displayDate || "Select date"}
        </span>
      </button>

      {isOpen && (
        <div className="absolute top-[105%] left-0 z-50 w-[280px] bg-white border border-gray-100 rounded-xl shadow-xl p-4">
          <div className="flex items-center justify-between mb-4 px-1">
            <button type="button" onClick={prevMonth} className="p-1 hover:bg-gray-50 rounded text-gray-400"><ChevronLeft className="w-4 h-4" /></button>
            <span className="text-xs font-semibold text-gray-800">{MONTHS[viewDate.month]} {viewDate.year}</span>
            <button type="button" onClick={nextMonth} className="p-1 hover:bg-gray-50 rounded text-gray-400"><ChevronRight className="w-4 h-4" /></button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-medium text-gray-400 mb-2">
            {WEEKDAYS.map(d => <span key={d}>{d}</span>)}
          </div>
          <div className="grid grid-cols-7 gap-1">
            {days.map((item, idx) => {
              const isSelected = selectedParts.length === 3 && parseInt(selectedParts[1]) === item.day && parseInt(selectedParts[2]) === viewDate.year && item.isCurrentMonth;
              return (
                <button key={idx} type="button" disabled={item.disabled} onClick={() => handleSelect(item.day)}
                  className={`text-[11px] h-7 w-7 mx-auto rounded-md flex items-center justify-center transition-all font-medium
                    ${!item.isCurrentMonth ? "text-gray-200 pointer-events-none" : ""}
                    ${item.disabled ? "text-gray-300/60 cursor-not-allowed" : "text-gray-800 hover:bg-gray-50 cursor-pointer"}
                    ${isSelected ? "bg-gray-900 text-white font-semibold" : ""}`}>
                  {item.day}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
