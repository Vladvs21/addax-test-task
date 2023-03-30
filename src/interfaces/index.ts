// Types

export  type MonthT = 'January' | 'February' | 'March' | 'April' | 'May' | 'June' | 'July' | 'August' | 'September' | 'October' | 'November' | 'December'
export  type DayT = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun"

export  type RGB = `rgb(${number}, ${number}, ${number})`;
export  type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
export  type HEX = `#${string}`;
export  type ColorT = RGB | RGBA | HEX;

// Interfaces

export interface MetaDataI {
    currentYear: number,
    currentMonth: number,
    currentDay: number,
    selectedYear: number,
    selectedMonth: number,
    selectedDay: number,
}

export interface WorldwideHolidaysI {
    date: string,
    name: string
}

export interface FilterI {
    text: string,
    label: LabelI[],
    searchTerm?: string
}

export interface TaskI {
    id: number,
    label: LabelI[],
    text: string,
    date: string
}

export interface LabelI {
    id: number,
    color: ColorT,
    text: string
}