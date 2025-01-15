let S = 2000000;
let p = 10;
let years = 20;
let R = p / (2000000 * 0.001 * 12);
let pp = 12 * years;
let st = pp * -1;
let n = 1 + R;
let K = 1 - (n ** st);
let M = S * R / K;
let Pereplata = (M * pp) - S;
console.log(Pereplata, typeof Pereplata);

