import { useEffect, useState } from "react";
import { CategoryType } from "../constants/categories";
import { taskService } from "../services/taskService";

export const useTasks = (user: any) => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [taskTitle, setTaskTitle] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    const unsubscribe = taskService.getTasks(user.uid, (data) => {
      setTasks(data);
      setLoading(false);
    });
    return () => unsubscribe();
  }, [user]);

  // Ngayon, tumatanggap na ito ng category galing sa UI
  const addTask = async (category: CategoryType) => {
    if (taskTitle.trim() === "" || !user) return;
    try {
      await taskService.addTask(user.uid, taskTitle, category);
      setTaskTitle("");
    } catch (error) {
      console.error("Hook Error adding task:", error);
    }
  };

  const deleteTask = async (taskId: string) => {
    try {
      await taskService.deleteTask(taskId);
    } catch (error) {
      console.error("Hook Error deleting task:", error);
    }
  };

  return { tasks, taskTitle, setTaskTitle, loading, addTask, deleteTask };
};
