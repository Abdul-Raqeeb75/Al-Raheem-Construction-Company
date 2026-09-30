/**
 * DESIGN FIDELITY: Original-project detail presentation in the supplied site's
 * blue/white card language, shared by previous and current project cards.
 */
import { MapPin, X } from "lucide-react";
import type { Project } from "@/data/siteContent";

type ProjectDialogProps = { project: Project | null; onClose: () => void };

export default function ProjectDialog({ project, onClose }: ProjectDialogProps) {
  if (!project) return null;

  return (
    <div className="original-modal-backdrop" role="presentation" onMouseDown={onClose}>
      <section className="original-modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event) => event.stopPropagation()}>
        <button type="button" className="original-modal__close" onClick={onClose} aria-label="Close project details"><X aria-hidden="true" /></button>
        <img className="original-modal__image" src={project.image} alt={project.title} />
        <div className="original-modal__content">
          <span className="original-eyebrow">{project.category}</span>
          <h2 id="project-title">{project.title}</h2>
          <p>{project.description}</p>
          <dl className="original-modal__facts">
            <div><dt>Location</dt><dd><MapPin aria-hidden="true" /> {project.location}</dd></div>
            <div><dt>Scope</dt><dd>{project.scope}</dd></div>
            {project.status && <div><dt>Status</dt><dd>{project.status}</dd></div>}
          </dl>
        </div>
      </section>
    </div>
  );
}
