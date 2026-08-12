/**
 * The login rate limiter, tested directly.
 *
 * It used to carry an off switch so the HTTP suite could not lock itself out,
 * which meant the limiter running in production was not the one under test.
 * The switch is gone and the limit is wide enough that a full run never
 * approaches it, so these exercise exactly the code a real sign-in hits.
 */
import assert from "node:assert/strict";
import { describe, test } from "node:test";

import { RATE_LIMIT, clearRateLimit, rateLimit } from "../lib/auth";

/** A fresh address per test: the counter is process-wide and keyed by IP. */
const ip = () => `198.51.100.${Math.floor(Math.random() * 250) + 1}-${Date.now().toString(36)}-${Math.random()}`;

describe("login rate limiting", () => {
  test("allows the whole allowance and refuses the next attempt", () => {
    const addr = ip();
    for (let i = 1; i <= RATE_LIMIT; i++) {
      assert.equal(rateLimit(addr), true, `attempt ${i} of ${RATE_LIMIT} should have been allowed`);
    }
    assert.equal(rateLimit(addr), false, `attempt ${RATE_LIMIT + 1} should be refused`);
  });

  test("counts each address separately", () => {
    const a = ip();
    const b = ip();
    for (let i = 0; i <= RATE_LIMIT; i++) rateLimit(a);
    assert.equal(rateLimit(a), false, "the exhausted address stays blocked");
    assert.equal(rateLimit(b), true, "a different address must not inherit the block");
  });

  test("a successful sign-in clears the count", () => {
    const addr = ip();
    for (let i = 0; i <= RATE_LIMIT; i++) rateLimit(addr);
    assert.equal(rateLimit(addr), false);

    // This is what the login route does once the password checks out.
    clearRateLimit(addr);
    assert.equal(rateLimit(addr), true, "clearing should let the address start again");
  });

  test("the allowance is wide enough to survive a test run", () => {
    /* The HTTP suite makes a handful of deliberately-wrong sign-ins from one
       address. If the allowance ever drops near that, the run starts failing
       for reasons that have nothing to do with what is being tested. */
    assert.ok(RATE_LIMIT >= 20, `the allowance is ${RATE_LIMIT}, which is tight enough to trip the suite`);
  });

  test("the limiter cannot be switched off by the environment", () => {
    const addr = ip();
    const env = process.env as Record<string, string | undefined>;
    const previous = env.AUTH_RATE_LIMIT;
    try {
      // The old escape hatch. Setting it must now do nothing at all.
      env.AUTH_RATE_LIMIT = "off";
      for (let i = 0; i <= RATE_LIMIT; i++) rateLimit(addr);
      assert.equal(rateLimit(addr), false, "the limiter honoured an environment variable it should ignore");
    } finally {
      if (previous === undefined) delete env.AUTH_RATE_LIMIT;
      else env.AUTH_RATE_LIMIT = previous;
    }
  });
});
