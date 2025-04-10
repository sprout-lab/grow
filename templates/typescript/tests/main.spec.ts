import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { greeting, main } from '../src/main';

describe('greeting()', () => {
  it('returns the correct greeting', async () => {
    expect(await greeting()).toBe('Hello <%= it.projectName %>!');
  });
});

describe('main()', () => {
  const logSpy = vi.spyOn(console, 'log').mockImplementation(() => undefined);

  beforeEach(() => {
    logSpy.mockClear();
  });

  afterEach(() => {
    logSpy.mockReset();
  });

  it('logs the greeting to the console', async () => {
    await main();
    expect(logSpy).toHaveBeenCalledOnce();
    expect(logSpy).toHaveBeenCalledWith('Hello <%= it.projectName %>!');
  });
});
