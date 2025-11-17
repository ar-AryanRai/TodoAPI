const baseUrl = "https://crudcrud.com/api/0ff2017d1dd4450d935cd61038a06cad";

const displayTasks = async () => {
  let remainingTasks = await axios
    .get(`${baseUrl}/remainingTasks`)
    .then((res) => res.data);
  let completedTasks = await axios
    .get(`${baseUrl}/completedTasks`)
    .then((res) => res.data);

  const remainingTasksContainer = document.querySelector(".remainingTasks");
  remainingTasksContainer.innerHTML = ``;

  const completedTasksContainer = document.querySelector(".completedTasks");
  completedTasksContainer.innerHTML = ``;

  remainingTasks.forEach((task) => {
    console.log(task);
    const div = `
          <div class="task bg-zinc-800 w-full flex justify-evenly items-center rounded-lg p-2 mt-2">
            <div class="task-name w-[30%]">${task.task}</div>
            <div class="task-desc w-[50%]">${task.description}</div>
            <div class="status text-xl cursor-pointer active:scale-90" onclick="handleTaskCompleted('${task._id}', '${task.task}', '${task.description}')">✅</div>
          </div>
        `;

    remainingTasksContainer.innerHTML += div;
  });

  completedTasks.forEach((task) => {
    const div = `
          <div class="task bg-zinc-800 w-full flex justify-evenly items-center rounded-lg p-2 mt-2">
            <div class="task-name w-[30%]">${task.task}</div>
            <div class="task-desc w-[50%]">${task.description}</div>
            <div class="status text-xl cursor-pointer active:scale-90" onclick="handleRemoveCompletedTask('${task._id}')">❌</div>
          </div>
        `;

    completedTasksContainer.innerHTML += div;
  });
};

displayTasks();

const handleRemoveCompletedTask = async (taskId) => {
  await axios.delete(`${baseUrl}/completedTasks/${taskId}`);
  displayTasks();
};

const handleTaskCompleted = async (id, task, desc) => {
  const taskData = {
    task: task,
    description: desc,
  };

  await axios.delete(`${baseUrl}/remainingTasks/${id}`);
  await axios.post(`${baseUrl}/completedTasks`, taskData);

  displayTasks();
};

const handleAddTask = async () => {
  const taskName = document.querySelector(".task-input-name");
  const taskDesc = document.querySelector(".task-input-desc");
  const task = {
    task: taskName.value,
    description: taskDesc.value,
  };

  await axios.post(`${baseUrl}/remainingTasks`, task);

  displayTasks();
  taskName.value = "";
  taskDesc.value = "";
};
