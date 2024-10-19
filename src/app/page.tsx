"use client";
import { useState } from "react";
import TaskForm from "@/components/TaskForm";
import TaskList from "@/components/TaskList";
import { Task } from "../types/task";
import "./globals.css";

const loadTasksFromLocalStorage = (): Task[] => {
  const tasks: Task[] = [];

  if (typeof window !== "undefined") {
    Object.keys(localStorage).forEach((key) => {
      if (key.startsWith("task_")) {
        const task = localStorage.getItem(key);
        if (task) tasks.push(JSON.parse(task));
      }
    });
  }

  return tasks;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>(loadTasksFromLocalStorage);
  const [taskToEdit, setTaskToEdit] = useState<Task | undefined>(undefined);

  const saveTaskToLocalStorage = (task: Task) => {
    localStorage.setItem(`task_${task.id}`, JSON.stringify(task));
  };

  const removeTaskFromLocalStorage = (id: number) => {
    localStorage.removeItem(`task_${id}`);
  };

  const addOrUpdateTask = (task: Task) => {
    if (taskToEdit) {
      setTasks((prev) => prev.map((t) => (t.id === task.id ? task : t)));
    } else {
      setTasks((prev) => [...prev, task]);
    }
    saveTaskToLocalStorage(task);
    setTaskToEdit(undefined);
  };
  const deleteTask = (id: number) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
    removeTaskFromLocalStorage(id);
  };

  const toggleComplete = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
    const updatedTask = tasks.find((task) => task.id === id);
    if (updatedTask) {
      saveTaskToLocalStorage(updatedTask);
    }
  };

  const editTask = (task: Task) => {
    setTaskToEdit(task);
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
