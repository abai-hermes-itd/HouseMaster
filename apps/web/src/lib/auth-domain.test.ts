// HM-005-QA1 — unit coverage for the Admin-realm domain check.
// Pure function, no next-auth/Next.js runtime dependency — runnable with
// Node's built-in test runner (no new devDependency required).
import { test } from "node:test";
import assert from "node:assert/strict";
import { isAllowedDomain } from "./auth-domain.ts";

const ORG_DOMAIN = "abay-germes.kz";

test("allows a Workspace account matching the configured domain", () => {
  assert.equal(isAllowedDomain(ORG_DOMAIN, ORG_DOMAIN), true);
});

test("rejects a personal Gmail account (no hd claim)", () => {
  assert.equal(isAllowedDomain(undefined, ORG_DOMAIN), false);
});

test("rejects an empty-string hd claim", () => {
  assert.equal(isAllowedDomain("", ORG_DOMAIN), false);
});

test("rejects a Workspace account from a different domain", () => {
  assert.equal(isAllowedDomain("someone-else.example", ORG_DOMAIN), false);
});

test("rejects when the configured domain is itself empty (misconfiguration)", () => {
  // Mirrors production default: ALLOWED_WORKSPACE_DOMAIN ?? "" when unset.
  assert.equal(isAllowedDomain(ORG_DOMAIN, ""), false);
  assert.equal(isAllowedDomain(undefined, ""), false);
});

test("is case-sensitive on the domain comparison", () => {
  assert.equal(isAllowedDomain(ORG_DOMAIN.toUpperCase(), ORG_DOMAIN), false);
});
