import {checkForName} from "./nameChecker";

test('adds 1 + 2 to equal 3', () => {
    const recosult = checkForName('Ctp');
    expect(recosult).toBe('Welcome');
});