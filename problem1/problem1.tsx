export function SumToN1(n: number) {
  let sum = 0;
  for (let i = 1; i <= n; i++) {
    sum += i;
  }
  return sum;
}

export function SumToN2(n: number) {
  const n_array = Array.from({ length: n }, (_, i) => i + 1)
  return n_array.reduce((acc, cur) => acc + cur, 0)
}

export function SumToN3(n: number) {
  return n * (n + 1) / 2
}

export function SumToN4(n: number): number {
  if (n <= 1) {
    return n;
  }
  return n + SumToN4(n - 1)
}

