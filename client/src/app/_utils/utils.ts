import { SpotForm } from "../_models/spotForm";

export function setMonthFlags(spot: SpotForm, months: string[]) {
    months.forEach(month => {
      switch (month) {
        case 'january':
          spot.january = true;
          break;
        case 'february':
          spot.february = true;
          break;
        case 'march':
          spot.march = true;
          break;
        case 'april':
          spot.april = true;
          break;
        case 'may':
          spot.may = true;
          break;
        case 'june':
          spot.june = true;
          break;
        case 'july':
          spot.july = true;
          break;
        case 'august':
          spot.august = true;
          break;
        case 'september':
          spot.september = true;
          break;
        case 'october':
          spot.october = true;
          break;
        case 'november':
          spot.november = true;
          break;
        case 'december':
          spot.december = true;
          break;
        default:
          break;
      }
    })
}

export function getMonthsFromFlags(spot: SpotForm): string[] {
    const months: string[] = [];
    
    if (spot.january) months.push('january');
    if (spot.february) months.push('february');
    if (spot.march) months.push('march');
    if (spot.april) months.push('april');
    if (spot.may) months.push('may');
    if (spot.june) months.push('june');
    if (spot.july) months.push('july');
    if (spot.august) months.push('august');
    if (spot.september) months.push('september');
    if (spot.october) months.push('october');
    if (spot.november) months.push('november');
    if (spot.december) months.push('december');
    
    return months;
}