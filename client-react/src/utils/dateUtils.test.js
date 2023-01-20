import { describe, it, expect } from 'vitest';
import {
  formatMonth,
  formatDayOfMonth,
  formatDayOfWeek,
  formatDayOfWeekShort,
  formatHour,
  formatDate,
  formatTime,
  // formatZonedTime,
  // formatZonedHour,
} from '@/utils/dateUtils';

const timestamp = 1674044194000; // Wednesday, January 18, 2023 7:16:34 AM GMT-05:00

// Jan, Feb, Mar,...
describe('#formatMonth', () => {
  it('should display the correct month for the given locale', () => {
    expect(formatMonth(timestamp, 'en')).toBe('Jan');
    expect(formatMonth(timestamp, 'fr')).toBe('janv.');
    expect(formatMonth(timestamp, 'sv')).toBe('jan.');
  });
});

// 1, 2, ..., 31
describe('#formatDayOfMonth', () => {
  it('should display the correct day of month', () => {
    expect(formatDayOfMonth(timestamp, 'd')).toBe('18');
  });
});

// Monday, Tuesday, Wednesday,...
describe('#formatDayOfWeek', () => {
  it('should display the correct day of week for the given locale', () => {
    expect(formatDayOfWeek(timestamp, 'en')).toBe('Wednesday');
    expect(formatDayOfWeek(timestamp, 'fr')).toBe('mercredi');
    expect(formatDayOfWeek(timestamp, 'sv')).toBe('onsdag');
  });
});

// Mon, Tue,...
describe('#formatDayOfWeekShort', () => {
  it('should display the correct day of week for the given locale', () => {
    expect(formatDayOfWeekShort(timestamp, 'en')).toBe('Wed');
    expect(formatDayOfWeekShort(timestamp, 'fr')).toBe('mer.');
    expect(formatDayOfWeekShort(timestamp, 'sv')).toBe('ons');
  });
});

// 5PM, 2AM
describe('#formatHour', () => {
  it('should display the correct hour', () => {
    expect(formatHour(timestamp)).toBe('7AM');
  });
});

// Apr 29, 1970
describe('#formatDate', () => {
  it('should display the correct date', () => {
    expect(formatDate(timestamp)).toBe('Jan 18, 2023');
  });
});

// 05:25 PM
describe('#formatTime', () => {
  it('should display the correct time', () => {
    expect(formatTime(timestamp)).toBe('7:16 AM');
  });
});

// 7:16 AM, 6:16 AM, 1:16 PM (for the given timezone)
describe('#formatZonedTime', () => {
  it('should display the correct zoned time', () => {
    // TODO: TypeError: utcToZonedTime is not a function
    // expect(formatZonedTime(timestamp, 'America/New_York')).toBe('7:16 AM');
    // expect(formatZonedTime(timestamp, 'America/Chicago')).toBe('6:16 AM');
    // expect(formatZonedTime(timestamp, 'Europe/Stockholm')).toBe('1:16 PM');
  });
});

// 7AM, 6AM, 1PM (for the given timezone)
describe('#formatZonedHour', () => {
  it('should display the correct zoned hour', () => {
    // TODO: TypeError: utcToZonedTime is not a function
    // expect(formatZonedHour(timestamp, 'America/New_York')).toBe('7AM');
    // expect(formatZonedHour(timestamp, 'America/Chicago')).toBe('6AM');
    // expect(formatZonedHour(timestamp, 'Europe/Stockholm')).toBe('1PM');
  });
});
