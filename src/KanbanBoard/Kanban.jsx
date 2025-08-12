import { useState, useEffect } from 'react';
import axios from 'axios';
import {
  DndContext,
  closestCorners,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';

import { KanbanType } from './KanbanType';

export const Kanban = () => {
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [columns, setColumns] = useState({
    'Ready to start': [],
    'In Progress': [],
    'Waiting for review': [],
    'Done': [],
    'Stuck': [],
    'Pending Deploy': []
  });

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const res = await axios.get('https://mocki.io/v1/282222c9-43cf-4d92-9ba0-0e0d1447f403');
        if (!res.data.response) {
          throw new Error('Invalid response format');
        }

        const projectsWithIds = res.data.data.map((project, index) => ({
          ...project,
          id: `${project.title}-${index}`,
          developer: project.developer.split(', ')
        }));

        const grouped = projectsWithIds.reduce((acc, project) => {
          const status = project.status || 'Ready to start';
          if (!acc[status]) acc[status] = [];
          acc[status].push(project);
          return acc;
        }, {
          'In Progress': [],
          'Ready to start': [],
          'Waiting for review': [],
          'Done': [],
          'Stuck': [],
          'Pending Deploy': []
        });
        
        setColumns(grouped);
        setError(null); // Clear any previous errors
      } catch (err) {
        setError(err.message);
        console.error('Error fetching projects:', err);
      }
    };

    fetchProjects();
  }, []);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    
    if (active.id !== over.id && active && over) {
      const activeColumn = Object.keys(columns).find(key => 
        columns[key].find(item => item.id === active.id)
      );
      const overColumn = Object.keys(columns).find(key => 
        columns[key].find(item => item.id === over.id)
      );
      
      if (activeColumn && overColumn && activeColumn === overColumn) {
        const items = [...columns[activeColumn]];
        const oldIndex = items.findIndex(item => item.id === active.id);
        const newIndex = items.findIndex(item => item.id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          const newItems = arrayMove(items, oldIndex, newIndex);
          setColumns(prev => ({
            ...prev,
            [activeColumn]: newItems
          }));
        }
      }
    }
  };

  const filteredColumns = Object.keys(columns).reduce((acc, columnKey) => {
    acc[columnKey] = columns[columnKey].filter(project =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    return acc;
  }, {});

  return (
    <div className="p-4 w-full overflow-x-auto">
      {error && (
        <div className="ml-10 mr-10 mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="text-sm">Error: {error}</p>
        </div>
      )}
      
      <div className="ml-10 mr-10 mb-4 pb-5 border-b border-solid border-gray-200">
        <input
          type="text"
          placeholder="Search..."
          className="w-full md:w-64 px-3 py-1.5 border rounded text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCorners}
        onDragEnd={handleDragEnd}
      >
        <div className="flex flex-row justify-center space-x-4 min-w-max">
          {Object.keys(filteredColumns).map((status) => {
            const columnColor = {
              'In Progress': 'bg-[#504e25] text-white',
              'Ready to start': 'bg-[#1F4C4A] text-white',
              'Waiting for review': 'bg-[#a61335] text-white',
              'Done': 'bg-[#8B3E2C] text-white',
              'Stuck': 'bg-[#2e4122] text-white',
              'Pending Deploy': 'bg-[#2c2259] text-white'
            }[status];
            
            return (
              <div
                key={status}
                className="min-w-52 max-w-52 flex-shrink-0 bg-gray-100"
              >
                <div className={`px-3 py-1.5 rounded-t-md flex items-center justify-between ${columnColor}`}>
                  <h2 className="text-xs font-medium">{status}</h2>
                  <span className="text-xs font-medium">{filteredColumns[status].length}</span>
                </div>
                <SortableContext
                  items={filteredColumns[status].map(item => item.id)}
                  strategy={horizontalListSortingStrategy}
                >
                  <div className="space-y-1.5 mt-1.5 mb-1.5 px-2">
                    {filteredColumns[status].map((project) => (
                      <KanbanType key={project.id} project={project} />
                    ))}
                  </div>
                </SortableContext>
              </div>
            );
          })}
        </div>
      </DndContext>
    </div>
  );
}
