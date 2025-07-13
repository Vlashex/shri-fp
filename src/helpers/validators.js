/**
 * @file Домашка по FP ч. 1
 *
 * Основная задача — написать самому, или найти в FP библиотеках функции anyPass/allPass
 * Эти функции/их аналоги есть и в ramda и в lodash
 *
 * allPass — принимает массив функций-предикатов, и возвращает функцию-предикат, которая
 * вернет true для заданного списка аргументов, если каждый из предоставленных предикатов
 * удовлетворяет этим аргументам (возвращает true)
 *
 * anyPass — то же самое, только удовлетворять значению может единственная функция-предикат из массива.
 *
 * Если какие либо функции написаны руками (без использования библиотек) это не является ошибкой
 */

import { not } from "./functions";
import {
  allPass,
  atLeastTwoGreen,
  countBy,
  hasCountAtLeast,
  isGreen,
  isRed,
  isCircleBlue,
  isCircleRed,
  isCircleWhite,
  isSquareBlue,
  isSquareGreen,
  isSquareOrange,
  isSquareRed,
  isStarBlue,
  isStarGreen,
  isStarRed,
  isTriangleBlue,
  isTriangleRed,
  isTriangleWhite,
  isCircleOrange,
  isTriangleOrange,
  isStarOrange,
  isStarWhite,
  anyPass,
  isCircleGreen,
  isTriangleGreen,
  isSame,
} from "./predicates";

// 1. Красная звезда, зеленый квадрат, все остальные белые.
export const validateFieldN1 = allPass([
  isStarRed,
  isSquareGreen,
  isTriangleWhite,
  isCircleWhite,
]);
// 2. Как минимум две фигуры зеленые.
export const validateFieldN2 = atLeastTwoGreen;

// 3. Количество красных фигур равно кол-ву синих.
export const validateFieldN3 = ({ star, square, triangle, circle }) => {
  const reds = [
    isStarRed({ star }),
    isSquareRed({ square }),
    isTriangleRed({ triangle }),
    isCircleRed({ circle }),
  ].filter(Boolean).length;

  const blues = [
    isStarBlue({ star }),
    isSquareBlue({ square }),
    isTriangleBlue({ triangle }),
    isCircleBlue({ circle }),
  ].filter(Boolean).length;

  return reds === blues;
};

// 4. Синий круг, красная звезда, оранжевый квадрат треугольник любого цвета
export const validateFieldN4 = allPass([
  isCircleBlue,
  isStarRed,
  isSquareOrange,
]);

// 5. Три фигуры одного любого цвета кроме белого (четыре фигуры одного цвета – это тоже true).
export const validateFieldN5 = ({ star, square, triangle, circle }) => {
  const colors = [star, square, triangle, circle].filter(
    (color) => color !== "white"
  );

  const counts = countBy(colors, (color) => color);

  return hasCountAtLeast(counts, 3);
};

// 6. Ровно две зеленые фигуры (одна из зелёных – это треугольник), плюс одна красная. Четвёртая оставшаяся любого доступного цвета, но не нарушающая первые два условия
export const validateFieldN6 = ({ star, square, triangle, circle }) => {
  if (!isGreen(triangle)) return false;

  const colors = [star, square, triangle, circle];
  const greenCount = colors.filter(isGreen).length;
  if (greenCount !== 2) return false;

  const redCount = colors.filter(isRed).length;
  if (redCount !== 1) return false;

  const nonGreenRed = colors.filter((c) => c !== "green" && c !== "red");
  if (nonGreenRed.length !== 1) return false;

  return true;
};

// 7. Все фигуры оранжевые.
export const validateFieldN7 = allPass([
  isCircleOrange,
  isSquareOrange,
  isTriangleOrange,
  isStarOrange,
]);

// 8. Не красная и не белая звезда, остальные – любого цвета.
export const validateFieldN8 = not(anyPass([isStarWhite, isStarRed]));

// 9. Все фигуры зеленые.
export const validateFieldN9 = allPass([
  isCircleGreen,
  isSquareGreen,
  isTriangleGreen,
  isStarGreen,
]);

// 10. Треугольник и квадрат одного цвета (не белого), остальные – любого цвета
export const validateFieldN10 = ({ square, triangle }) =>
  isSame({ a: square, b: triangle }) && not(isStarWhite(square));
