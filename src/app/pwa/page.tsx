'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Tab } from '@headlessui/react';
import { PlusIcon, PencilIcon, TrashIcon, LightBulbIcon, ChartBarIcon, UserGroupIcon } from '@heroicons/react/24/solid';

import 'react-big-calendar/lib/css/react-big-calendar.css';

// Set up the localizer for react-big-calendar
const localizer = momentLocalizer(moment);

interface SubTask {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
}

interface Task {
  id: number;
  text: string;
  completed: boolean;
  description?: string;
  subTasks: SubTask[];
}

interface Event {
  id: number;
  title: string;
  start: Date;
  end: Date;
  description?: string;
}

interface Milestone {
  id: number;
  title: string;
  dueDate: Date;
}

interface TimeEntry {
  id: number;
  task: string;
  duration: number;
  date: Date;
}

interface Bug {
  id: number;
  title: string;
  description: string;
  status: 'Open' | 'In Progress' | 'Closed';
}

interface Goal {
  id: number;
  title: string;
  description: string;
  tasks: Task[];
  progress: number;
}

interface Idea {
  id: number;
  title: string;
  description: string;
  tags: string[];
}

interface CollaborationInvite {
  id: number;
  projectName: string;
  inviteeEmail: string;
  permissions: 'read' | 'write' | 'admin';
}

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState({ text: '', description: '' });
  const [events, setEvents] = useState<Event[]>([]);
  const [newEvent, setNewEvent] = useState({ title: '', start: new Date(), end: new Date(), description: '' });
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState({ title: '', dueDate: new Date() });
  const [timeEntries, setTimeEntries] = useState<TimeEntry[]>([]);
  const [newTimeEntry, setNewTimeEntry] = useState({ task: '', duration: 0, date: new Date() });
  const [bugs, setBugs] = useState<Bug[]>([]);
  const [newBug, setNewBug] = useState<{ title: string; description: string; status: 'Open' | 'In Progress' | 'Closed' }>({ title: '', description: '', status: 'Open' });
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [editingSubTask, setEditingSubTask] = useState<{ taskId: number; subTask: SubTask } | null>(null);
  
  // New state variables for additional features
  const [goals, setGoals] = useState<Goal[]>([]);
  const [newGoal, setNewGoal] = useState({ title: '', description: '' });
  const [ideas, setIdeas] = useState<Idea[]>([]);
  const [newIdea, setNewIdea] = useState({ title: '', description: '', tags: '' });
  const [focusModeActive, setFocusModeActive] = useState(false);
  const [collaborationInvites, setCollaborationInvites] = useState<CollaborationInvite[]>([]);
  const [newCollaborationInvite, setNewCollaborationInvite] = useState({ projectName: '', inviteeEmail: '', permissions: 'read' as 'read' | 'write' | 'admin' });

  useEffect(() => {
    const loadedTasks = localStorage.getItem('tasks');
    if (loadedTasks) setTasks(JSON.parse(loadedTasks));

    const loadedEvents = localStorage.getItem('events');
    if (loadedEvents) setEvents(JSON.parse(loadedEvents, (key, value) => {
      if (key === 'start' || key === 'end') return new Date(value);
      return value;
    }));

    const loadedMilestones = localStorage.getItem('milestones');
    if (loadedMilestones) setMilestones(JSON.parse(loadedMilestones, (key, value) => {
      if (key === 'dueDate') return new Date(value);
      return value;
    }));

    const loadedTimeEntries = localStorage.getItem('timeEntries');
    if (loadedTimeEntries) setTimeEntries(JSON.parse(loadedTimeEntries, (key, value) => {
      if (key === 'date') return new Date(value);
      return value;
    }));

    const loadedBugs = localStorage.getItem('bugs');
    if (loadedBugs) setBugs(JSON.parse(loadedBugs));

    // Load new features data
    const loadedGoals = localStorage.getItem('goals');
    if (loadedGoals) setGoals(JSON.parse(loadedGoals));

    const loadedIdeas = localStorage.getItem('ideas');
    if (loadedIdeas) setIdeas(JSON.parse(loadedIdeas));

    const loadedCollaborationInvites = localStorage.getItem('collaborationInvites');
    if (loadedCollaborationInvites) setCollaborationInvites(JSON.parse(loadedCollaborationInvites));
  }, []);

  const saveTasks = (newTasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(newTasks));
    setTasks(newTasks);
  };

  const saveEvents = (newEvents: Event[]) => {
    localStorage.setItem('events', JSON.stringify(newEvents));
    setEvents(newEvents);
  };

  const saveMilestones = (newMilestones: Milestone[]) => {
    localStorage.setItem('milestones', JSON.stringify(newMilestones));
    setMilestones(newMilestones);
  };

  const saveTimeEntries = (newTimeEntries: TimeEntry[]) => {
    localStorage.setItem('timeEntries', JSON.stringify(newTimeEntries));
    setTimeEntries(newTimeEntries);
  };

  const saveBugs = (newBugs: Bug[]) => {
    localStorage.setItem('bugs', JSON.stringify(newBugs));
    setBugs(newBugs);
  };

  const saveGoals = (newGoals: Goal[]) => {
    localStorage.setItem('goals', JSON.stringify(newGoals));
    setGoals(newGoals);
  };

  const saveIdeas = (newIdeas: Idea[]) => {
    localStorage.setItem('ideas', JSON.stringify(newIdeas));
    setIdeas(newIdeas);
  };

  const saveCollaborationInvites = (newInvites: CollaborationInvite[]) => {
    localStorage.setItem('collaborationInvites', JSON.stringify(newInvites));
    setCollaborationInvites(newInvites);
  };

  const handleAddTask = () => {
    if (newTask.text.trim() !== '') {
      const newTasks = [...tasks, { id: Date.now(), text: newTask.text, completed: false, description: newTask.description, subTasks: [] }];
      saveTasks(newTasks);
      setNewTask({ text: '', description: '' });
    }
  };

  const handleToggleTask = (id: number) => {
    const newTasks = tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks(newTasks);
  };

  const handleAddSubTask = (taskId: number, subTaskText: string, subTaskDescription: string = '') => {
    const newTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, subTasks: [...task.subTasks, { id: Date.now(), text: subTaskText, completed: false, description: subTaskDescription }] }
        : task
    );
    saveTasks(newTasks);
  };

  const handleToggleSubTask = (taskId: number, subTaskId: number) => {
    const newTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, subTasks: task.subTasks.map(subTask => 
            subTask.id === subTaskId ? { ...subTask, completed: !subTask.completed } : subTask
          )}
        : task
    );
    saveTasks(newTasks);
  };

  const handleEditTask = (task: Task) => {
    const newTasks = tasks.map(t => t.id === task.id ? task : t);
    saveTasks(newTasks);
    setEditingTask(null);
  };

  const handleEditSubTask = (taskId: number, subTask: SubTask) => {
    const newTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, subTasks: task.subTasks.map(st => st.id === subTask.id ? subTask : st) }
        : task
    );
    saveTasks(newTasks);
    setEditingSubTask(null);
  };

  const handleRemoveTask = (taskId: number) => {
    const newTasks = tasks.filter(task => task.id !== taskId);
    saveTasks(newTasks);
  };

  const handleRemoveSubTask = (taskId: number, subTaskId: number) => {
    const newTasks = tasks.map(task => 
      task.id === taskId 
        ? { ...task, subTasks: task.subTasks.filter(st => st.id !== subTaskId) }
        : task
    );
    saveTasks(newTasks);
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.start && newEvent.end) {
      const newEvents = [...events, { id: Date.now(), ...newEvent }];
      saveEvents(newEvents);
      setNewEvent({ title: '', start: new Date(), end: new Date(), description: '' });
    }
  };

  const handleAddMilestone = () => {
    if (newMilestone.title && newMilestone.dueDate) {
      const newMilestones = [...milestones, { id: Date.now(), ...newMilestone }];
      saveMilestones(newMilestones);
      setNewMilestone({ title: '', dueDate: new Date() });
    }
  };

  const handleAddTimeEntry = () => {
    if (newTimeEntry.task && newTimeEntry.duration && newTimeEntry.date) {
      const newTimeEntries = [...timeEntries, { id: Date.now(), ...newTimeEntry }];
      saveTimeEntries(newTimeEntries);
      setNewTimeEntry({ task: '', duration: 0, date: new Date() });
    }
  };

  const handleAddBug = () => {
    if (newBug.title && newBug.description) {
      const newBugs = [...bugs, { id: Date.now(), ...newBug }];
      saveBugs(newBugs);
      setNewBug({ title: '', description: '', status: 'Open' });
    }
  };

  const handleEventSelect = (event: Event) => {
    setSelectedEvent(event);
    setShowModal(true);
  };

  // New handlers for additional features
  const handleAddGoal = () => {
    if (newGoal.title) {
      const newGoals = [...goals, { id: Date.now(), ...newGoal, tasks: [], progress: 0 }];
      saveGoals(newGoals);
      setNewGoal({ title: '', description: '' });
    }
  };

  const handleAddIdea = () => {
    if (newIdea.title) {
      const newIdeas = [...ideas, { id: Date.now(), ...newIdea, tags: newIdea.tags.split(',').map(tag => tag.trim()) }];
      saveIdeas(newIdeas);
      setNewIdea({ title: '', description: '', tags: '' });
    }
  };

  const handleToggleFocusMode = () => {
    setFocusModeActive(!focusModeActive);
    // Here you would implement the actual focus mode functionality
    // For example, blocking certain websites or notifications
  };

  const handleAddCollaborationInvite = () => {
    if (newCollaborationInvite.projectName && newCollaborationInvite.inviteeEmail) {
      const newInvites = [...collaborationInvites, { id: Date.now(), ...newCollaborationInvite }];
      saveCollaborationInvites(newInvites);
      setNewCollaborationInvite({ projectName: '', inviteeEmail: '', permissions: 'read' });
    }
  };

  const timeTrackingData = timeEntries.reduce((acc, entry) => {
    const date = moment(entry.date).format('YYYY-MM-DD');
    if (!acc[date]) {
      acc[date] = 0;
    }
    acc[date] += entry.duration;
    return acc;
  }, {} as { [key: string]: number });

  const chartData = Object.entries(timeTrackingData).map(([date, hours]) => ({ date, hours }));

  const EventComponent = ({ event }: { event: Event }) => (
    <div>
      <strong>{event.title}</strong>
      <p>{moment(event.start).format('HH:mm')} - {moment(event.end).format('HH:mm')}</p>
      {event.description && (
        <button onClick={() => handleEventSelect(event)} className="text-blue-500 hover:underline">
          Show Description
        </button>
      )}
    </div>
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Project Management App</h1>
      <Tab.Group>
        <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
          {['Tasks', 'Calendar', 'Planning', 'Time Tracking', 'Bug Tracking', 'Goals', 'Ideas', 'Collaboration'].map((category) => (
            <Tab
              key={category}
              className={({ selected }) =>
                `w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-blue-700
                 ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2
                 ${selected ? 'bg-white shadow' : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'}`
              }
            >
              {category}
            </Tab>
          ))}
        </Tab.List>
        <Tab.Panels className="mt-2">      
        <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            <div className="flex mb-4">
              <input
                type="text"
                value={newTask.text}
                onChange={(e) => setNewTask({ ...newTask, text: e.target.value })}
                className="flex-grow border p-2 mr-2 rounded"
                placeholder="New task"
              />
              <input
                type="text"
                value={newTask.description}
                onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                className="flex-grow border p-2 mr-2 rounded"
                placeholder="Description (optional)"
              />
              <button onClick={handleAddTask} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                <PlusIcon className="h-5 w-5" />
              </button>
            </div>
            <ul className="space-y-4">
              {tasks.map(task => (
                <li key={task.id} className="bg-gray-100 p-2 rounded">
                  {editingTask && editingTask.id === task.id ? (
                    <div className="flex flex-col space-y-2">
                      <input
                        type="text"
                        value={editingTask.text}
                        onChange={(e) => setEditingTask({ ...editingTask, text: e.target.value })}
                        className="border p-1 rounded"
                      />
                      <input
                        type="text"
                        value={editingTask.description}
                        onChange={(e) => setEditingTask({ ...editingTask, description: e.target.value })}
                        className="border p-1 rounded"
                        placeholder="Description (optional)"
                      />
                      <div className="flex space-x-2">
                        <button onClick={() => handleEditTask(editingTask)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                          Save
                        </button>
                        <button onClick={() => setEditingTask(null)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggleTask(task.id)}
                            className="mr-2"
                          />
                          <span className={task.completed ? 'line-through text-gray-500' : ''}>{task.text}</span>
                        </div>
                        <div className="flex space-x-2">
                          <button onClick={() => setEditingTask(task)} className="text-blue-500 hover:text-blue-700">
                            <PencilIcon className="h-5 w-5" />
                          </button>
                          <button onClick={() => handleRemoveTask(task.id)} className="text-red-500 hover:text-red-700">
                            <TrashIcon className="h-5 w-5" />
                          </button>
                        </div>
                      </div>
                      {task.description && <p className="text-sm text-gray-600 mt-1">{task.description}</p>}
                    </div>
                  )}
                  <ul className="ml-6 mt-2 space-y-2">
                    {task.subTasks.map(subTask => (
                      <li key={subTask.id} className="flex items-center justify-between">
                        {editingSubTask && editingSubTask.taskId === task.id && editingSubTask.subTask.id === subTask.id ? (
                          <div className="flex flex-col space-y-2 w-full">
                            <input
                              type="text"
                              value={editingSubTask.subTask.text}
                              onChange={(e) => setEditingSubTask({ ...editingSubTask, subTask: { ...editingSubTask.subTask, text: e.target.value } })}
                              className="border p-1 rounded"
                            />
                            <input
                              type="text"
                              value={editingSubTask.subTask.description}
                              onChange={(e) => setEditingSubTask({ ...editingSubTask, subTask: { ...editingSubTask.subTask, description: e.target.value } })}
                              className="border p-1 rounded"
                              placeholder="Description (optional)"
                            />
                            <div className="flex space-x-2">
                              <button onClick={() => handleEditSubTask(task.id, editingSubTask.subTask)} className="bg-green-500 text-white px-2 py-1 rounded hover:bg-green-600">
                                Save
                              </button>
                              <button onClick={() => setEditingSubTask(null)} className="bg-gray-500 text-white px-2 py-1 rounded hover:bg-gray-600">
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <>
                            <div className="flex items-center">
                              <input
                                type="checkbox"
                                checked={subTask.completed}
                                onChange={() => handleToggleSubTask(task.id, subTask.id)}
                                className="mr-2"
                              />
                              <span className={subTask.completed ? 'line-through text-gray-500' : ''}>{subTask.text}</span>
                            </div>
                            <div className="flex space-x-2">
                              <button onClick={() => setEditingSubTask({ taskId: task.id, subTask })} className="text-blue-500 hover:text-blue-700">
                                <PencilIcon className="h-4 w-4" />
                              </button>
                              <button onClick={() => handleRemoveSubTask(task.id, subTask.id)} className="text-red-500 hover:text-red-700">
                                <TrashIcon className="h-4 w-4" />
                              </button>
                            </div>
                          </>
                        )}
                        {subTask.description && <p className="text-xs text-gray-600 mt-1">{subTask.description}</p>}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-2 flex space-x-2">
                    <input
                      type="text"
                      placeholder="Add sub-task"
                      className="border p-1 text-sm rounded flex-grow"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          handleAddSubTask(task.id, target.value);
                          target.value = '';
                        }
                      }}
                    />
                    <input
                      type="text"
                      placeholder="Sub-task description (optional)"
                      className="border p-1 text-sm rounded flex-grow"
                      onKeyPress={(e: React.KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                          const target = e.target as HTMLInputElement;
                          const textInput = target.previousElementSibling as HTMLInputElement;
                          handleAddSubTask(task.id, textInput.value, target.value);
                          textInput.value = '';
                          target.value = '';
                        }
                      }}
                    />
                  </div>
                  </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
          <h2 className="text-2xl font-bold mb-4">Calendar</h2>
          <div className="mb-4 flex space-x-2">
            <input
              type="text"
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
              className="border p-2 rounded"
              placeholder="Event title"
            />
            <input
              type="datetime-local"
              value={moment(newEvent.start).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setNewEvent({ ...newEvent, start: new Date(e.target.value) })}
              className="border p-2 rounded"
            />
            <input
              type="datetime-local"
              value={moment(newEvent.end).format('YYYY-MM-DDTHH:mm')}
              onChange={(e) => setNewEvent({ ...newEvent, end: new Date(e.target.value) })}
              className="border p-2 rounded"
            />
            <input
              type="text"
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
              className="border p-2 rounded"
              placeholder="Description (optional)"
            />
            <button onClick={handleAddEvent} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            style={{ height: 500 }}
            components={{
              event: EventComponent,
            }}
          />
        </Tab.Panel>
        <Tab.Panel className="rounded-xl bg-white p-3">
          <h2 className="text-2xl font-bold mb-4">Project Planning</h2>
          <div className="mb-4 flex space-x-2">
            <input
              type="text"
              value={newMilestone.title}
              onChange={(e) => setNewMilestone({ ...newMilestone, title: e.target.value })}
              className="flex-grow border p-2 rounded"
              placeholder="Milestone title"
            />
            <input
              type="date"
              value={moment(newMilestone.dueDate).format('YYYY-MM-DD')}
              onChange={(e) => setNewMilestone({ ...newMilestone, dueDate: new Date(e.target.value) })}
              className="border p-2 rounded"
            />
            <button onClick={handleAddMilestone} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          <ul className="space-y-2">
            {milestones.map(milestone => (
              <li key={milestone.id} className="flex items-center justify-between bg-gray-100 p-2 rounded">
                <span>{milestone.title}</span>
                <span className="text-gray-500">{moment(milestone.dueDate).format('MMMM D, YYYY')}</span>
              </li>
            ))}
          </ul>
        </Tab.Panel>
        <Tab.Panel className="rounded-xl bg-white p-3">
          <h2 className="text-2xl font-bold mb-4">Time Tracking</h2>
          <div className="mb-4 flex space-x-2">
            <input
              type="text"
              value={newTimeEntry.task}
              onChange={(e) => setNewTimeEntry({ ...newTimeEntry, task: e.target.value })}
              className="flex-grow border p-2 rounded"
              placeholder="Task name"
            />
            <input
              type="number"
              value={newTimeEntry.duration}
              onChange={(e) => setNewTimeEntry({ ...newTimeEntry, duration: Number(e.target.value) })}
              className="border p-2 rounded w-20"
              placeholder="Hours"
            />
            <input
              type="date"
              value={moment(newTimeEntry.date).format('YYYY-MM-DD')}
              onChange={(e) => setNewTimeEntry({ ...newTimeEntry, date: new Date(e.target.value) })}
              className="border p-2 rounded"
            />
            <button onClick={handleAddTimeEntry} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              <PlusIcon className="h-5 w-5" />
            </button>
          </div>
          <BarChart width={600} height={300} data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="hours" fill="#8884d8" />
          </BarChart>
        </Tab.Panel>
        <Tab.Panel className="rounded-xl bg-white p-3">
          <h2 className="text-2xl font-bold mb-4">Bug Tracking</h2>
          <div className="mb-4 space-y-2">
            <input
              type="text"
              value={newBug.title}
              onChange={(e) => setNewBug({ ...newBug, title: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder="Bug title"
            />
            <textarea
              value={newBug.description}
              onChange={(e) => setNewBug({ ...newBug, description: e.target.value })}
              className="w-full border p-2 rounded"
              placeholder="Bug description"
              rows={3}
            />
            <select
              value={newBug.status}
              onChange={(e) => setNewBug({ ...newBug, status: e.target.value as 'Open' | 'In Progress' | 'Closed' })}
              className="w-full border p-2 rounded"
            >
              <option value="Open">Open</option>
              <option value="In Progress">In Progress</option>
              <option value="Closed">Closed</option>
            </select>
            <button onClick={handleAddBug} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              Add Bug
            </button>
          </div>
          <ul className="space-y-2">
            {bugs.map(bug => (
              <li key={bug.id} className="bg-gray-100 p-2 rounded">
                <div className="flex justify-between items-center">
                  <span className="font-bold">{bug.title}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    bug.status === 'Open' ? 'bg-red-500 text-white' :
                    bug.status === 'In Progress' ? 'bg-yellow-500 text-black' :
                    'bg-green-500 text-white'
                  }`}>
                    {bug.status}
                  </span>
                </div>
                <p className="text-sm text-gray-600 mt-1">{bug.description}</p>
                </li>
              ))}
            </ul>
          </Tab.Panel>
          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="text-2xl font-bold mb-4">Goals</h2>
            <div className="mb-4 space-y-2">
              <input
                type="text"
                value={newGoal.title}
                onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Goal title"
              />
              <textarea
                value={newGoal.description}
                onChange={(e) => setNewGoal({...newGoal, description: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Goal description"
                rows={3}
              />
              <button onClick={handleAddGoal} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Goal
              </button>
            </div>
            <ul className="space-y-2">
              {goals.map(goal => (
                <li key={goal.id} className="bg-gray-100 p-2 rounded">
                  <h3 className="font-bold">{goal.title}</h3>
                  <p className="text-sm text-gray-600">{goal.description}</p>
                  <div className="mt-2">
                    <div className="bg-gray-200 h-2 rounded-full">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{ width: `${goal.progress}%` }}
                      ></div>
                    </div>
                    <span className="text-sm text-gray-600">{goal.progress}% Complete</span>
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>

          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="text-2xl font-bold mb-4">Ideas</h2>
            <div className="mb-4 space-y-2">
              <input
                type="text"
                value={newIdea.title}
                onChange={(e) => setNewIdea({ ...newIdea, title: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Idea title"
              />
              <textarea
                value={newIdea.description}
                onChange={(e) => setNewIdea({ ...newIdea, description: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Idea description"
                rows={3}
              />
              <input
                type="text"
                value={newIdea.tags}
                onChange={(e) => setNewIdea({ ...newIdea, tags: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Tags (comma-separated)"
              />
              <button onClick={handleAddIdea} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Add Idea
              </button>
            </div>
            <ul className="space-y-2">
              {ideas.map(idea => (
                <li key={idea.id} className="bg-gray-100 p-2 rounded">
                  <h3 className="font-bold">{idea.title}</h3>
                  <p className="text-sm text-gray-600">{idea.description}</p>
                  <div className="mt-2 flex flex-wrap">
                    {idea.tags.map((tag, index) => (
                      <span key={index} className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded mr-2 mb-2">
                        {tag}
                      </span>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </Tab.Panel>

          <Tab.Panel className="rounded-xl bg-white p-3">
            <h2 className="text-2xl font-bold mb-4">Collaboration</h2>
            <div className="mb-4 space-y-2">
              <input
                type="text"
                value={newCollaborationInvite.projectName}
                onChange={(e) => setNewCollaborationInvite({ ...newCollaborationInvite, projectName: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Project name"
              />
              <input
                type="email"
                value={newCollaborationInvite.inviteeEmail}
                onChange={(e) => setNewCollaborationInvite({ ...newCollaborationInvite, inviteeEmail: e.target.value })}
                className="w-full border p-2 rounded"
                placeholder="Invitee email"
              />
              <select
                value={newCollaborationInvite.permissions}
                onChange={(e) => setNewCollaborationInvite({ ...newCollaborationInvite, permissions: e.target.value as 'read' | 'write' | 'admin' })}
                className="w-full border p-2 rounded"
              >
                <option value="read">Read</option>
                <option value="write">Write</option>
                <option value="admin">Admin</option>
              </select>
              <button onClick={handleAddCollaborationInvite} className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Send Invite
              </button>
            </div>
            <ul className="space-y-2">
              {collaborationInvites.map(invite => (
                <li key={invite.id} className="bg-gray-100 p-2 rounded flex justify-between items-center">
                  <div>
                    <h3 className="font-bold">{invite.projectName}</h3>
                    <p className="text-sm text-gray-600">{invite.inviteeEmail}</p>
                  </div>
                  <span className="bg-blue-200 text-blue-800 text-xs px-2 py-1 rounded">
                    {invite.permissions}
                  </span>
                </li>
              ))}
            </ul>
          </Tab.Panel>
        </Tab.Panels>
      </Tab.Group>

      <div className="mt-4">
        <h2 className="text-2xl font-bold mb-2">Focus Mode</h2>
        <button
          onClick={handleToggleFocusMode}
          className={`w-full px-4 py-2 rounded ${
            focusModeActive
              ? 'bg-red-500 hover:bg-red-600 text-white'
              : 'bg-green-500 hover:bg-green-600 text-white'
          }`}
        >
          {focusModeActive ? 'Disable Focus Mode' : 'Enable Focus Mode'}
        </button>
      </div>

      {showModal && selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg max-w-md w-full">
            <h3 className="text-lg font-bold mb-2">{selectedEvent.title}</h3>
            <p className="mb-2">
              {moment(selectedEvent.start).format('MMMM D, YYYY HH:mm')} - {moment(selectedEvent.end).format('HH:mm')}
            </p>
            <p className="mb-4">{selectedEvent.description}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}