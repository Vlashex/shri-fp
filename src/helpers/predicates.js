import { overEvery, overSome } from "lodash";

export const allPass = overEvery;
export const anyPass = overSome;

export const isStarRed = ({ star }) => star === "red";
export const isStarWhite = ({ star }) => star === "white";
export const isStarOrange = ({ star }) => star === "orange";
export const isStarGreen = ({ star }) => star === "green";
export const isStarBlue = ({ star }) => star === "blue";

export const isSquareRed = ({ square }) => square === "red";
export const isSquareWhite = ({ square }) => square === "white";
export const isSquareOrange = ({ square }) => square === "orange";
export const isSquareGreen = ({ square }) => square === "green";
export const isSquareBlue = ({ square }) => square === "blue";

export const isTriangleRed = ({ triangle }) => triangle === "red";
export const isTriangleWhite = ({ triangle }) => triangle === "white";
export const isTriangleOrange = ({ triangle }) => triangle === "orange";
export const isTriangleGreen = ({ triangle }) => triangle === "green";
export const isTriangleBlue = ({ triangle }) => triangle === "blue";

export const isCircleRed = ({ circle }) => circle === "red";
export const isCircleWhite = ({ circle }) => circle === "white";
export const isCircleOrange = ({ circle }) => circle === "orange";
export const isCircleGreen = ({ circle }) => circle === "green";
export const isCircleBlue = ({ circle }) => circle === "blue";

export const isRed = (c) => c === "red";
export const isGreen = (c) => c === "green";

export const isSame = ({ a, b }) => a === b;

export const atLeastTwoGreen = ({ star, square, triangle, circle }) => {
  const greenFlags = [
    isStarGreen({ star }),
    isSquareGreen({ square }),
    isTriangleGreen({ triangle }),
    isCircleGreen({ circle }),
  ];
  return greenFlags.filter(Boolean).length >= 2;
};

export const countBy = (arr, fn) =>
  arr.reduce((acc, item) => {
    const key = fn(item);
    acc[key] = (acc[key] || 0) + 1;
    return acc;
  }, {});

export const hasCountAtLeast = (obj, n) =>
  Object.values(obj).some((count) => count >= n);
