import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';

export const KanbanType = ({ project }) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition
  } = useSortable({ id: project.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white rounded border border-gray-200 shadow-sm hover:shadow-md transition-shadow cursor-move"
    >
      <div className="p-3">
        <h3 className="text-sm mb-2">{project.title}</h3>
        <div className="flex flex-wrap gap-1 relative">
          {project.type === 'Bug' && (
            <span className="chips-type font-semibold inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-black border border-gray-300 h-4">
              Bug
            </span>
          )}
          {project.type === 'Feature Enhancements' && (
            <span className="chips-type font-semibold inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-black border border-gray-300 h-4">
              Feature Enhancements
            </span>
          )}
          {project.type === 'Other' && (
            <span className="chips-type font-semibold inline-flex items-center px-2 py-0.5 rounded text-xs bg-gray-100 text-black border border-gray-300 h-4">
              Other
            </span>
          )}
        </div>
        <div className="author flex items-center mt-2 text-xs text-gray-500">
          {project.developer.map((dev, index) => (
            <span key={index} className="bg-red-500 text-white px-1.5 py-0.5 rounded-full text-xs mr-1 border border-white">
              {dev[0].toUpperCase()}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};
