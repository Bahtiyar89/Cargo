export const days = ['Пн', 'Вт', 'Ср', 'Чет', 'Пят', 'Суб', 'Вос'];
export const months = [
  'Январь',
  'Февраль',
  'Март',
  'Апрель',
  'Май',
  'Июнь',
  'Июль',
  'Август',
  'Сентябрь',
  'Октябрь',
  'Ноябрь',
  'Декабрь',
];

export const locale = {
  localize: {
    day: (n) => days[n],
    month: (n) => months[n],
  },
  formatLong: {
    date: () => 'mm.dd.yyyy',
  },
};

export function momentToStringDDMMYYYY(momentVal) {
  return momentVal ? momentVal?.format('DD.MM.YYYY') : '';
}
