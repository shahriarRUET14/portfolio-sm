import { Connector, DiagramFrame, Layer, Node } from './parts';

const tenants = ['Tenant A', 'Tenant B', 'Tenant C', 'Tenant D'];

export default function TenancyDiagram() {
  return (
    <DiagramFrame
      title="Commerce SaaS — schematic"
      caption="Simplified view; tenant names are placeholders."
    >
      <Layer label="Product surfaces">
        <div className="grid grid-cols-2 gap-2">
          <Node>Next.js storefront</Node>
          <Node>React back office</Node>
        </div>
      </Layer>

      <Connector />

      <Layer label="Shared platform">
        <Node emphasis className="justify-between gap-3">
          <span className="font-medium">Ruby on Rails APIs</span>
          <span className="text-right text-xs text-muted">one codebase</span>
        </Node>
      </Layer>

      <Connector />

      <Layer label="Products">
        <div className="grid grid-cols-2 gap-2">
          <Node>B2B sales &amp; distribution</Node>
          <Node>eCommerce order &amp; delivery</Node>
        </div>
      </Layer>

      <Connector />

      <Layer label="Tenant-level customisation">
        <ul className="grid grid-cols-2 gap-2 sm:grid-cols-4">
          {tenants.map((tenant) => (
            <li
              key={tenant}
              className="border border-dashed border-line-strong px-3 py-2 text-[13px]"
            >
              {tenant}
              <span className="mt-1 block font-mono text-[10px] uppercase tracking-wider text-accent-ink">
                own config
              </span>
            </li>
          ))}
        </ul>
      </Layer>
    </DiagramFrame>
  );
}
