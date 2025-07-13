/**
 * @file Домашка по FP ч. 2
 *
 * Подсказки:
 * Метод get у инстанса Api – каррированый
 * GET / https://animals.tech/{id}
 *
 * GET / https://api.tech/numbers/base
 * params:
 * – number [Int] – число
 * – from [Int] – из какой системы счисления
 * – to [Int] – в какую систему счисления
 *
 * Иногда промисы от API будут приходить в состояние rejected, (прямо как и API в реальной жизни)
 * Ответ будет приходить в поле {result}
 */
import Api from "../tools/api";

const api = new Api();

const tap = (fn) => (v) => {
  fn(v);
  return v;
};

const isNumberString = (v) => /^[0-9.]+$/.test(v);

const validate = (v) =>
  v.length > 2 && v.length < 10 && isNumberString(v) && parseFloat(v) > 0;

const round = (n) => Math.round(n);
const length = (s) => s.length;
const square = (n) => n * n;
const mod3 = (n) => n % 3;

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const log = tap(writeLog);

  if (!validate(value)) {
    handleError("ValidationError");
    return;
  }

  Promise.resolve(value)
    .then(log)
    .then(parseFloat)
    .then(round)
    .then(log)
    .then((n) =>
      api.get("https://api.tech/numbers/base")({
        from: 10,
        to: 2,
        number: n.toString(),
      })
    )
    .then(({ result }) => result)
    .then(log)
    .then(length)
    .then(log)
    .then(square)
    .then(log)
    .then(mod3)
    .then(log)
    .then((id) => api.get(`https://animals.tech/${id}`)({}))
    .then(({ result }) => handleSuccess(result))
    .catch(handleError);
};

export default processSequence;
