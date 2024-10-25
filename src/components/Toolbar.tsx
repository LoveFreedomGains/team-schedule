import React, { useRef } from 'react';
import {
  PlusIcon,
  DocumentArrowDownIcon,
  FolderOpenIcon,
  ArrowUturnLeftIcon,
  ArrowUturnRightIcon
} from '@heroicons/react/24/solid';

interface ToolbarProps {
  onNewProject: () => void;
  onSaveProject: () => void;
  onSaveProjectAs: () => void;
  onLoadProject: (data: any) => void;
  onUndo: () => void;
  onRedo: () => void;
}

const Toolbar: React.FC<ToolbarProps> = ({
  onNewProject,
  onSaveProject,
  onSaveProjectAs,
  onLoadProject,
  onUndo,
  onRedo
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          onLoadProject(JSON.parse(content));
        } catch (error) {
          alert('Error loading project file. Please ensure it is a valid JSON file.');
        }
      };
      reader.readAsText(file);
    }
    // Reset the input so the same file can be loaded again if needed
    if (event.target) {
      event.target.value = '';
    }
  };

  return (
    <div className="bg-gray-200 p-2 flex space-x-2">
      <button onClick={onNewProject} className="toolbar-button" title="New Project">
        <PlusIcon className="h-5 w-5" />
      </button>
      <button onClick={onSaveProject} className="toolbar-button" title="Save Project">
        <DocumentArrowDownIcon className="h-5 w-5" />
      </button>
      <button onClick={onSaveProjectAs} className="toolbar-button" title="Save Project As">
        <DocumentArrowDownIcon className="h-5 w-5" />
        <span className="text-xs">As</span>
      </button>
      <button 
        onClick={() => fileInputRef.current?.click()} 
        className="toolbar-button" 
        title="Load Project"
      >
        <FolderOpenIcon className="h-5 w-5" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        className="hidden"
      />
      <div className="border-l border-gray-400 mx-2 h-6"></div>
      <button onClick={onUndo} className="toolbar-button" title="Undo">
        <ArrowUturnLeftIcon className="h-5 w-5" />
      </button>
      <button onClick={onRedo} className="toolbar-button" title="Redo">
        <ArrowUturnRightIcon className="h-5 w-5" />
      </button>
    </div>
  );
};

export default Toolbar;
