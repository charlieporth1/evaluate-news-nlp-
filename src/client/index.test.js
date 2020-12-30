import { checkForName } from './js/nameChecker.js'
import { handleSubmit } from './js/formHandler.js'


test('adds 1 + 2 to equal 3', () => {
    const recosult = checkForName('Ctp');
    expect(recosult).toBe('Welcome');
});