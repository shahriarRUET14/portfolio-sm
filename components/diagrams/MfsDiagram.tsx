import type { CSSProperties } from 'react';
import { Connector, DiagramFrame, Layer, Node } from './parts';

const SERVICE_COUNT = 27;

export default function MfsDiagram() {
  return (
    <DiagramFrame
      title="MFS platform — schematic"
      caption="Simplified view. Service boundaries are generalised for confidentiality; the counts of services, portals and apps are real."
    >
      <Layer label="Channels">
        <div className="grid grid-cols-3 gap-2">
          <Node>6 Flutter mobile apps</Node>
          <Node>React user portal</Node>
          <Node>Angular back office</Node>
        </div>
      </Layer>

      <Connector />

      <Layer label="Brands">
        <div className="grid grid-cols-3 gap-2">
          {['LENDEN', 'TeleCash', 'MyCash'].map((brand) => (
            <div
              key={brand}
              className="border-t-2 border-accent-ink bg-surface-2 px-3 py-3 font-display text-[15px] font-semibold sm:text-lg"
            >
              {brand}
            </div>
          ))}
        </div>
        <Node emphasis className="mt-2 justify-between gap-3">
          <span className="font-medium">Shared service modules</span>
          <span className="text-right text-xs text-muted">
            reused by all three brands
          </span>
        </Node>
      </Layer>

      <Connector />

      <Layer label={`${SERVICE_COUNT} microservices`}>
        <div
          data-reveal-cells
          className="grid grid-cols-9 gap-1.5"
          aria-hidden="true"
        >
          {Array.from({ length: SERVICE_COUNT }, (_, i) => (
            <span
              key={i}
              style={{ '--i': i } as CSSProperties}
              className="cell aspect-square border border-line-strong/70 bg-surface-2 hover:bg-accent"
            />
          ))}
        </div>
        <p className="mt-2 font-mono text-[11px] text-subtle">
          Java / Spring Boot · Node.js · Ruby on Rails
        </p>
      </Layer>

      <Connector />

      <Layer label="Messaging, caching & data">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Node>
            <span>
              <span className="font-medium">Kafka</span>
              <span className="text-muted"> — event-driven flows</span>
            </span>
          </Node>
          <Node>
            <span>
              <span className="font-medium">Redis</span>
              <span className="text-muted"> — caching</span>
            </span>
          </Node>
          <Node>
            <span>
              <span className="font-medium">PostgreSQL</span>
              <span className="text-muted"> — storage</span>
            </span>
          </Node>
        </div>
      </Layer>
    </DiagramFrame>
  );
}
