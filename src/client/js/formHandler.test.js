import { handleSubmit } from './formHandler.js';
test('adds 1 + 2 to equal 3', () => {
    const recosult = handleSubmit();
    expect(recosult).toBe(true);
});