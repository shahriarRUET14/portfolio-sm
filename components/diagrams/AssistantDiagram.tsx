import { ArrowRight } from '../icons';
import { DiagramFrame } from './parts';

const steps = [
  {
    name: 'Question',
    detail: 'A user asks in plain language — “Who was on leave last Tuesday?”',
  },
  {
    name: 'Tenant context',
    detail: 'That customer’s assistant behaviour, data scope and workflows.',
  },
  {
    name: 'Retrieval',
    detail:
      'Attendance, leave and workforce records fetched through platform APIs.',
  },
  {
    name: 'Prompt',
    detail: 'Retrieved context assembled into a designed prompt.',
    guarded: true,
  },
  { name: 'LLM', detail: 'The model drafts a response.', guarded: true },
  {
    name: 'Guardrails & evaluation',
    detail: 'Checked before anything reaches the user.',
    guarded: true,
  },
  { name: 'Answer', detail: 'Scoped to that tenant’s data.' },
];

const coreServices = [
  'Device integration',
  'Attendance processing',
  'Reporting',
];

export default function AssistantDiagram() {
  return (
    <DiagramFrame
      title="Assistant request path — design view"
      caption="Simplified design view of work in progress. The example question is illustrative."
    >
      <ol className="relative">
        <span
          aria-hidden="true"
          className="absolute bottom-6 left-[0.6875rem] top-3 w-px bg-line-strong"
        />
        {steps.map((step, i) => (
          <li
            key={step.name}
            className="relative grid grid-cols-[1.5rem_1fr] gap-4 pb-4 last:pb-0"
          >
            <span
              aria-hidden="true"
              className={`relative z-10 mt-1 flex h-[1.375rem] w-[1.375rem] items-center justify-center border font-mono text-[10px] ${
                step.guarded
                  ? 'border-accent-ink bg-accent text-accent-fg'
                  : 'border-line-strong bg-bg text-muted'
              }`}
            >
              {i + 1}
            </span>
            <div
              className={
                step.guarded
                  ? 'border-l-2 border-accent-ink/60 bg-accent/5 py-1 pl-3'
                  : 'py-1'
              }
            >
              <p className="text-[15px] font-medium">
                {step.name}
                {step.guarded ? (
                  <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-accent-ink">
                    guarded
                  </span>
                ) : null}
              </p>
              <p className="mt-0.5 text-[13px] leading-snug text-muted">
                {step.detail}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <div className="mt-6 border-t border-line pt-4">
        <p className="label mb-2 text-[0.6875rem] text-subtle">
          Core services owned alongside the AI layer
        </p>
        <ul className="flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px]">
          {coreServices.map((service, i) => (
            <li key={service} className="flex items-center gap-2">
              <span className="border border-line-strong/70 bg-bg px-2.5 py-1.5">
                {service}
              </span>
              {i < coreServices.length - 1 ? (
                <ArrowRight size={12} className="text-subtle" />
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </DiagramFrame>
  );
}
