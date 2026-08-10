/**
 * The login rate limiter, tested directly.
 *
 * The HTTP suite runs with AUTH_RATE_LIMIT=off, because a tripped limiter locks
 * a whole test run out for fifteen minutes. That would leave the limiter itself
 * untested, so the counting is exercised here against the real function with the
 * bypass explicitly disabled.
 */
import assert from "node:assert/strict";
import { beforeEach, describe, test } from "node:test";

// The bypass is read on every call rather than at import time, so a plain import
// is enough and each test can set the flag it needs.
import { clearRateLimit, rateLimit } from "../lib/auth";

beforeEach(() => {
  process.env.AUTH_RATE_LIMIT = "on";
});

const ip = () => `198.51.100.${Math.floor(Math.random() * 250) + 1}-${Date.now().toString(36)}`;

describe("login rate limiting", () => {
  test("allows five attempts and refuses the sixth", () => {
    const addr = ip();
    for (let i = 1; i <= 5; i++) {
      assert.equal(rateLimit(addr), true, `attempt ${i} should have been allowed`);
    }
    assert.equal(rateLimit(addr), false, "the sixth attempt should be refused");
  });

  test("counts each address separately", () => {
    const a = ip();
    const b = ip();
    for (let i = 0; i < 6; i++) rateLimit(a);
    assert.equal(rateLimit(a), false, "the exhausted address stays blocked");
    assert.equal(rateLimit(b), true, "a different address must not inherit the block");
  });

  test("a successful sign-in clears the count", () => {
    const addr = ip();
    for (let i = 0; i < 5; i++) rateLimit(addr);
    assert.equal(rateLimit(addr), false);

    // This is what the login route does once the password checks out.
    clearRateLimit(addr);
    assert.equal(rateLimit(addr), true, "clearing should let the address start again");
  });

  test("the production guard ignores the bypass", () => {
    const addr = ip();
    // Next types NODE_ENV as readonly; the test needs to move it for one assertion.
    const env = process.env as Record<string, string | undefined>;
    const previous = env.NODE_ENV;
    try {
      env.AUTH_RATE_LIMIT = "off";
      env.NODE_ENV = "production";
      for (let i = 0; i < 6; i++) rateLimit(addr);
      assert.equal(rateLimit(addr), false, "the bypass must never apply in production");
    } finally {
      env.NODE_ENV = previous;
      env.AUTH_RATE_LIMIT = "on";
    }
  });

  test("the bypass works when it is allowed to", () => {
    const addr = ip();
    process.env.AUTH_RATE_LIMIT = "off";
    try {
      for (let i = 0; i < 20; i++) {
        assert.equal(rateLimit(addr), true, "with the bypass on, nothing should be refused");
      }
    } finally {
      process.env.AUTH_RATE_LIMIT = "on";
    }
  });
});
