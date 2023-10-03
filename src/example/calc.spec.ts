export function add(x: number, y: number) {
  return x + y;
}

describe('Initial test', () => {
  it('add funcion', () => {
    expect(add(1, 2)).toEqual(3);
  });
});
