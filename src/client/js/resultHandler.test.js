import {clickToCopyAction} from './resultHandler';
test('adds 1 + 2 to equal 3', () => {
    const recosult = clickToCopyAction("root");
    expect(recosult).toBe('Copied');
});