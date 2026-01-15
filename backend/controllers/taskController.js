import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  try {
    const { title, priority } = req.body;

    const task = await Task.create({
      title,
      priority
    });

    res.status(201).json(task);
    }   catch (error) {
    res.status(500).json({ message: "Task creation failed", error });
    }
};


export const getTasks = async(req, res) => {
    try{
        const tasks = await Task.find().sort({ createdAt:-1 });
        res.json(tasks);
    } catch(error){
        res.status(500).json({ message: "Failed to fetch task", error });
    }
};

export const updateTask = async (req, res) => {
    try{
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.json(task);
    } catch(error){
        res.status(500).json({ message: "Failed to update task...", error });
    }
};

export const deleteTask = async (req, res) => {
    try{
        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: "Task deleted successfully" });
    } catch(error){
        res.status(500).json({ message: "Failed to delete task...", error });
    }
};