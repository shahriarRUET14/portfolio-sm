import { ArrowDown } from '../icons';
import { DiagramFrame } from './parts';

const stages = [
  { name: 'Manual process', detail: 'Handled by hand' },
  { name: 'Custom form', detail: 'Captures the request' },
  { name: 'Business logic', detail: 'Rules and routing' },
  { name: 'Integrations', detail: 'Connected systems' },
  { name: 'Digital workflow', detail: 'Live on ProcessMaker', done: true },
];

export default function WorkflowsDiagram() {
  return (
    <DiagramFrame
      title="Workflow anatomy"
      caption="The shape each of the 200+ workflows followed on the BPM platform."
    >
      <ol className="grid md:grid-cols-5">
        {stages.map((stage, i) => (
          <li key={stage.name} className="flex flex-col">
            <div
              className={`flex flex-1 flex-col justify-center border px-3 py-3 ${
                stage.done
                  ? 'border-accent-ink/50 bg-accent/10'
                  : 'border-line-strong/70 bg-bg'
              } ${i > 0 ? 'md:border-l-0' : ''}`}
            >
              <span className="font-mono text-[10px] text-subtle">
                {String(i + 1).padStart(2, '0')}
              </span>
              <span className="mt-1 text-[14px] font-medium">{stage.name}</span>
              <span className="text-[12px] text-muted">{stage.detail}</span>
            </div>
            {i < stages.length - 1 ? (
              <span
                aria-hidden="true"
                className="flex justify-center py-1.5 text-subtle md:hidden"
              >
                <ArrowDown size={12} />
              </span>
            ) : null}
          </li>
        ))}
      </ol>
    </DiagramFrame>
  );
}
