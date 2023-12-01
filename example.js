/* Filename: ComplexJavaScriptCode */

// This code demonstrates a complex and elaborate example of a task management system

// Define a class for tasks
class Task {
  constructor(title, description, priority, dueDate) {
    this.title = title;
    this.description = description;
    this.priority = priority;
    this.dueDate = dueDate;
    this.completed = false;
  }
  
  completeTask() {
    this.completed = true;
  }
  
  updatePriority(newPriority) {
    this.priority = newPriority;
  }
}

// Create an array to store tasks
const tasks = [];

// Add sample tasks
tasks.push(new Task("Implement authentication module", "Setup user authentication using OAuth", 1, "2022-01-31"));
tasks.push(new Task("Design responsive UI", "Create a responsive user interface for the application", 2, "2022-02-15"));
tasks.push(new Task("Integrate with external API", "Connect the application with a third-party API for data retrieval", 3, "2022-02-28"));

// Define a function to display tasks
function displayTasks() {
  tasks.forEach((task, index) => {
    console.log(`Task ${index+1}: ${task.title}`);
    console.log(`Description: ${task.description}`);
    console.log(`Priority: ${task.priority}`);
    console.log(`Due Date: ${task.dueDate}`);
    console.log(`Completed: ${task.completed ? "Yes" : "No"}`);
    console.log("-----------------------");
  });
}

// Call the displayTasks function to show initial tasks
displayTasks();

// Modify a task
tasks[0].updatePriority(2);

// Complete a task
tasks[2].completeTask();

console.log("Task list after modification:");
console.log("-----------------------------");

// Display the updated task list
displayTasks();

// Additional code can include features for task creation, deletion, sorting, etc.
// This code is just an example to demonstrate the complexity and structure of a sophisticated task management system in JavaScript.