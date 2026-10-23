import type { Principle } from './types';

// Each principle is tied to evidence from the résumé in `inPractice`.
export const principles: Principle[] = [
  {
    title: 'Correctness comes first where money moves.',
    body: 'In financial systems, a fast feature that occasionally miscounts is a liability. I treat data integrity as a requirement of the design, and build transaction flows that can be reconciled and audited.',
    inPractice:
      'The MFS platform behind LENDEN, TeleCash and MyCash carries ~20M BDT in daily transactions with zero settlement mismatch.',
  },
  {
    title: 'Build shared capabilities once.',
    body: 'When several products need the same behaviour, one shared module beats several drifting copies — as long as its boundary is explicit and someone owns it.',
    inPractice:
      'Shared service modules are reused across all three MFS brands instead of being re-implemented per brand.',
  },
  {
    title: 'Make tenant boundaries explicit.',
    body: 'In multi-tenant software, what each customer can see and change should be a deliberate part of the design, not a filter added later.',
    inPractice:
      'Tenant-level customisation in a shared Rails platform; per-tenant data scope and behaviour for an AI assistant.',
  },
  {
    title: 'Let AI accelerate the work, not own it.',
    body: 'LLMs and coding agents shorten review, testing and documentation cycles. In regulated code, their output still passes through people who are accountable for it.',
    inPractice:
      'Set team standards at RedDot Digital that pair agent output with human review gates for financial code.',
  },
  {
    title: 'Automate the checks people shouldn’t do by hand.',
    body: 'Repetitive verification is where errors hide. If a reconciliation or an approval follows rules, those rules belong in software.',
    inPractice:
      'Automated reconciliation of aggregator transaction data, and 200+ digital workflows replacing manual processes for Robi Axiata.',
  },
  {
    title: 'Own the system in production.',
    body: 'Shipping is the midpoint. I stay close to how systems behave under real load and take ownership when they don’t.',
    inPractice:
      'Owned complex production incidents on the MFS platform while mentoring engineers across development, QA and operations.',
  },
];
