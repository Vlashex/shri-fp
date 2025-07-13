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
const getNumbersBase = api.get("https://api.tech/numbers/base");
const getAnimalById = (id) => {
  const request = api.get(`https://animals.tech/${id}`);
  return request({});
};

const buildNumberBaseParams = (n) => ({
  from: 10,
  to: 2,
  number: n.toString(),
});

const tap = (fn) => (v) => {
  fn(v);
  return v;
};

const isNumberString = (v) => /^[0-9.]+$/.test(v);

const validate = (v) =>
  v.length > 2 && v.length < 10 && isNumberString(v) && parseFloat(v) > 0;

const extractResult = ({ result }) => result;

const round = (n) => Math.round(n);
const length = (s) => s.length;
const square = (n) => n * n;
const mod3 = (n) => n % 3;
const toString = (n) => n.toString();

const processSequence = ({ value, writeLog, handleSuccess, handleError }) => {
  const log = tap(writeLog);

  if (!validate(value)) {
    handleError("ValidationError");
    return;
  }

  Promise.resolve(value)
    .then(log) // Записываем исходную строку
    .then(parseFloat) // Преобразуем в число
    .then(round) // Округляем до ближайшего целого
    .then(log) // Логируем округлённое число
    .then(toString) // Превращаем число обратно в строку
    .then(buildNumberBaseParams) // Формируем параметры для запроса перевода в двоичную систему
    .then(getNumbersBase) // Запрашиваем перевод числа в двоичный формат
    .then(extractResult) // Берём из ответа нужное значение
    .then(log) // Логируем двоичное число
    .then(length) // Считаем длину двоичной строки
    .then(log) // Логируем длину
    .then(square) // Возводим длину в квадрат
    .then(log) // Логируем результат
    .then(mod3) // Берём остаток от деления на 3
    .then(log) // Логируем остаток
    .then(getAnimalById) // Получаем животное по id
    .then(extractResult) // Берём имя животного из ответа
    .then(handleSuccess) // Завершаем успешным результатом
    .catch(handleError); // Обрабатываем ошибку в любом шаге цепочки
};

export default processSequence;
