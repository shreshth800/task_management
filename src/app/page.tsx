"use client";
import { Task } from "../types/task";
import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import "./globals.css";

const initialTasks: Task[] = [
  {
    id: 1,
    title: "Task 1",
    description: "Description 1",
    priority: "high",
    completed: false,
  },
  {
    id: 2,
    title: "Task 2",
    description: "Description 2",
    priority: "medium",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "Description 3",
    priority: "low",
    completed: true,
  },
];

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const addOrUpdateTask = (task: Task) => {
    if (taskToEdit) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t))); // Update existing task
    } else {
      setTasks((prev) => [...prev, task]); // Add new task
    }
    setTaskToEdit(undefined); // Reset editing state
  };

  const editTask = (task: Task) => {
    setTaskToEdit(task); // Set task to be edited
  };

  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id)); // Delete task
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    ); // Toggle completion status
  };

  return (
    <div>
      <h1>Task Management App</h1>
      <TaskForm onSubmit={addOrUpdateTask} taskToEdit={taskToEdit} />
      <TaskList
        tasks={tasks}
        onEdit={editTask}
        onDelete={deleteTask}
        onToggleComplete={toggleComplete}
      />
    </div>
  );
}
