import StringMask from 'string-mask';
import moment from 'moment';
import createNumberMask from 'text-mask-addons/dist/createNumberMask';

const percentFormatter = new StringMask('##0,00%', { reverse: true });
const moneyFormatter = new StringMask('R$ #.##0,00', { reverse: true });
const phoneFormatter = new StringMask('(00) 00009-0000');
const cnpjFormatter = new StringMask('00.000.000/0000-00');
const cpfFormatter = new StringMask('000.000.000-00');
const cepFormatter = new StringMask('00.000-000');

export const shortDateMask = (value) => {
  const date = moment(value, 'YYYY-MM-DD');
  return date.format('YYYY-MM-DD');
};

export const shortDateUnmask = (value) => {
  return value;
};

export const shortDateViewMask = (value) => {
  const date = moment(value, 'YYYY-MM-DD');
  return date.format('DD/MM/YY');
};



export const shortTimeMask = (value) => {
  const time = moment(value, 'HH:mm:ss');
  return time.format('HH:mm');
};

export const shortTimeUnmask = (value) => {
  return value;
};


export const fullDateTimeMask = (value) => {
  const time = moment(value);
  return time.format('DD/MM/YY HH:mm');
};


const moneyMask = (value) => {
  return moneyFormatter.apply(value);
};

export const moneyDecimal = value => value / 100

const moneyUnmask = (value) => {
  return +unmaskNumber(value)*100;
};



const percentMask = (value) => {    
  return percentFormatter.apply(value);
};

const percentUnmask = (value) => {  
  return +unmaskNumber(value)*100;
};


const integerMask = (value) => {
  return unmaskNumber(value);
};

const integerUnmask = (value) => {
  return unmaskNumber(value);
};


const phoneMask = (value) => {
  value = phoneUnmask(value);
  return phoneFormatter.apply(value);
};

const phoneUnmask = (value) => {
  return value.replace(/\D/g,'');  
};


const cpfMask = (value) => {
  value = cpfUnmask(value);
  return cpfFormatter.apply(value);
};

const cpfUnmask = (value) => {
  return value && value.replace(/\D/g,'');  
};



const cnpjMask = (value) => {  
  value = cnpjUnmask(value);  
  return cnpjFormatter.apply(value);
};

const cnpjUnmask = (value) => {  
  return value && value.replace(/\D/g,'');  
};

const cepMask = (value) => {
  value = unmaskNumber(value);
  return cepFormatter.apply(value);
};

const cepUnmask = (value) => {
  return value.replace(/\D/g,'');  
};

const unmaskNumber = (value) => {
  value = (value || '') + '';
  const numericValue = value
    .replace(/\./, '')
    .replace(/,/, '.')
    .replace(/[^\d.]/g,'');
  return numericValue;
};


const toMask = text => (text || '').split('').map(chr => chr === '9' ? /\d/ : chr);
export const percent = {
  mask: percentMask,
  unmask: percentUnmask,
  inputMask: createNumberMask({
    prefix: '',
    allowDecimal: true,
    decimalSymbol: ',',
    includeThousandsSeparator: false,
    suffix: '%'
  })
};

export const cnpj = {
  mask: cnpjMask,
  unmask: cnpjUnmask,
  inputMask: toMask('99.999.999/9999-99')
};

export const cep = {
  mask: cepMask,
  unmask: cepUnmask,
  inputMask: toMask('99999-999')
};

export const cpf = {
  mask: cpfMask,
  unmask: cpfUnmask,
  inputMask: toMask('999.999.999-99')
};

export const phone = {
  mask: phoneMask,
  unmask: phoneUnmask,
  inputMask: text => phoneUnmask(text || '').length <= 10 ? toMask('(99) 9999-9999') : toMask('(99) 99999-9999'),
};

export const integer = {
  mask: integerMask,
  unmask: integerUnmask,
  inputMask: createNumberMask({
    prefix: '',
    includeThousandsSeparator: false,
    suffix: ''
  })
};

export const money = {
  mask: moneyMask,
  unmask: moneyUnmask,
  inputMask: createNumberMask({
    prefix: 'R$ ',
    allowDecimal: true,
    decimalSymbol: ',',
    includeThousandsSeparator: false,
    suffix: ''
  })
};
