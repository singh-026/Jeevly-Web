import type { EnquiryCreatedResponse, EnquiryErrorResponse, EnquiryPayload } from "./types";

/*
 * Sample request and responses for `POST /api/v1/enquiries`, for backend work, API
 * mocks and tests. Not imported by the site. `satisfies` makes the type-check
 * fail if these drift from the contract in ./types.
 */

/** INR: a founder in India on the services page who filled in everything. */
export const exampleEnquiryInr = {
  schemaVersion: 1,
  contact: { email: "priya@acme.in", name: "Priya Sharma", phone: "+91 98765 43210" },
  persona: "founder",
  services: ["plan", "design", "build"],
  budget: {
    id: "tier-3",
    label: "₹1,00,000 - ₹2,50,000",
    min: 100_000,
    max: 250_000,
    currency: "INR",
  },
  description: "A booking app for independent yoga studios: class schedules, payments and reminders.",
  meta: {
    submittedAt: "2026-10-13T09:42:17.512Z",
    sourcePath: "/services",
    referrer: "https://www.google.com/",
    locale: "en-IN",
  },
  website: "",
} satisfies EnquiryPayload;

/** USD: a US business on the home page, top tier, so `max` is open-ended. */
export const exampleEnquiryUsd = {
  schemaVersion: 1,
  contact: { email: "james@brightlane.com" },
  persona: "business",
  services: ["modernize", "marketing"],
  budget: {
    id: "tier-5",
    label: "$20,000+",
    min: 20_000,
    max: null,
    currency: "USD",
  },
  description: "Our order system is a 2014 PHP app. We want it rebuilt on a modern stack, then a relaunch campaign.",
  meta: {
    submittedAt: "2026-10-13T18:20:05.127Z",
    sourcePath: "/",
    referrer: "https://www.linkedin.com/",
    locale: "en-US",
  },
  website: "",
} satisfies EnquiryPayload;

/** "Not sure yet": the currency is kept, but there is no range. */
export const exampleEnquiryBudgetUnsure = {
  schemaVersion: 1,
  contact: { email: "sam@studio-nine.co" },
  persona: "founder",
  services: ["design"],
  budget: {
    id: "unsure",
    label: "Not sure yet",
    min: null,
    max: null,
    currency: "USD",
  },
  description: null,
  meta: {
    submittedAt: "2026-10-13T11:07:44.890Z",
    sourcePath: "/services",
    referrer: null,
    locale: "en-GB",
  },
  website: "",
} satisfies EnquiryPayload;

/** The least a visitor can send: only the required email. */
export const minimalEnquiry = {
  schemaVersion: 1,
  contact: { email: "ops@northwind.com" },
  persona: "business",
  services: [],
  budget: null,
  description: null,
  meta: {
    submittedAt: "2026-10-13T15:03:58.004Z",
    sourcePath: "/about",
    referrer: null,
    locale: "en-US",
  },
  website: "",
} satisfies EnquiryPayload;

export const exampleCreated = {
  id: "enq_01JA8Z3K7Q2M4X9B5N6P8R0T1V",
  receivedAt: "2026-10-13T09:42:18.031Z",
} satisfies EnquiryCreatedResponse;

export const exampleValidationError = {
  error: {
    code: "validation_failed",
    message: "Enter a valid email address.",
    field: "contact.email",
  },
} satisfies EnquiryErrorResponse;
