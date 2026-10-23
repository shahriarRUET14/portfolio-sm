import type { ComponentType } from 'react';
import type { ProjectDiagram as DiagramType } from '@/content/types';
import AssistantDiagram from './AssistantDiagram';
import MfsDiagram from './MfsDiagram';
import TenancyDiagram from './TenancyDiagram';
import WorkflowsDiagram from './WorkflowsDiagram';

const diagrams: Record<DiagramType, ComponentType> = {
  mfs: MfsDiagram,
  assistant: AssistantDiagram,
  tenancy: TenancyDiagram,
  workflows: WorkflowsDiagram,
};

export default function ProjectDiagram({ type }: { type: DiagramType }) {
  const Diagram = diagrams[type];
  return <Diagram />;
}
