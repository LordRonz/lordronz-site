import { beforeEach, describe, expect, it, vi } from 'vitest';

import { incrementBlogView } from '@/lib/actions/incrementBlogView';
import { db, viewRef } from '@/lib/db';

vi.mock('@/lib/db', () => ({
  db: vi.fn(),
  viewRef: vi.fn(),
}));

const INCREMENT_SENTINEL = { sentinel: 'FieldValue.increment(1)' };

vi.mock('firebase-admin/firestore', () => ({
  FieldValue: {
    increment: vi.fn(() => INCREMENT_SENTINEL),
  },
}));

const mockedDb = vi.mocked(db);
const mockedViewRef = vi.mocked(viewRef);

const fakeRef = { id: 'fake-ref' };

const setupFakes = (doc: { exists: boolean; data: () => unknown }) => {
  const t = {
    get: vi.fn().mockResolvedValue(doc),
    update: vi.fn(),
    set: vi.fn(),
  };
  const runTransaction = vi.fn((callback: (t: unknown) => unknown) =>
    Promise.resolve(callback(t)),
  );
  mockedDb.mockReturnValue({ runTransaction } as never);
  mockedViewRef.mockReturnValue({ doc: vi.fn(() => fakeRef) } as never);
  return t;
};

describe('incrementBlogView', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('increments and returns currentViews + 1 for an existing doc', async () => {
    const t = setupFakes({
      exists: true,
      data: () => ({ currentViews: 5 }),
    });

    const result = await incrementBlogView('hello-world');

    expect(result).toBe(6);
    expect(t.update).toHaveBeenCalledWith(fakeRef, {
      currentViews: INCREMENT_SENTINEL,
    });
    expect(t.set).not.toHaveBeenCalled();
  });

  it('creates a missing doc with currentViews: 1 and returns 1', async () => {
    const t = setupFakes({
      exists: false,
      data: () => undefined,
    });

    const result = await incrementBlogView('brand-new-post');

    expect(result).toBe(1);
    expect(t.set).toHaveBeenCalledWith(fakeRef, { currentViews: 1 });
    expect(t.update).not.toHaveBeenCalled();
  });
});
