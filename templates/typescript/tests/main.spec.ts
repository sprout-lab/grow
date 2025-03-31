import { describe, it, expect, vi } from 'vitest';
import { greeting, main } from '../src/main';

describe('greeting function', () => {
  it('should return "Hello <%= it.projectName %>!"', () => {
    expect(greeting()).toBe('Hello <%= it.projectName %>!');
  });
});

describe('main function', () => {
  it('should log the greeting message', async () => {
    // Spy on console.log
    const logSpy = vi.spyOn(console, 'log').mockImplementation(() => {});
    await main();
    expect(logSpy).toHaveBeenCalledWith('Hello <%= it.projectName %>!');
    logSpy.mockRestore();
  });
});