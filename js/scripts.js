// Business Logic for ToDoList ---------
function ToDoList() {
  this.tasks = [],
  this.currentTaskId = 0
}

ToDoList.prototype.addTask = function(task) {
  task.id = this.assignTaskId();
  this.tasks.push(task);
}

ToDoList.prototype.assignTaskId = function() {
  this.currentTaskId += 1;
  return this.currentTaskId;
}

ToDoList.prototype.findTask = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        return this.tasks[i];
      }
    }
  };
  return false;
}

ToDoList.prototype.deleteTask = function(id) {
  for (var i=0; i< this.tasks.length; i++) {
    if (this.tasks[i]) {
      if (this.tasks[i].id == id) {
        delete this.tasks[i];
        return true;
      }
    }
  };
  return false;
}

//Business Logic for tasks ---------

function Task(inputtedTask) {
  this.inputtedTask = inputtedTask
}

// User Interface Logic ---------
var toDoList = new ToDoList();

function displayTaskDetails(toDoListToDisplay) {
  var tasksList = $("ul#tasks");
  var htmlForTaskInfo = "";
  toDoListToDisplay.tasks.forEach(function(task) {
    htmlForTaskInfo += "<li id=" + task.id + ">" + task.inputtedTask + "</li>";
  });
  tasksList.html(htmlForTaskInfo);
};

function showTask(taskId) {
  var task = toDoList.findTask(taskId);
  $("#show-task").show();
  $(".inputtedTask").html(task.inputtedTask);
  var buttons = $("#buttons");
  buttons.empty();
  buttons.append("<button class='deleteButton' id=" + task.id + ">Done!</button>");
}

function attachTaskListeners() {
  $("ul#tasks").on("click", "li", function() {
    showTask(this.id);
  });
  $("#buttons").on("click", ".deleteButton", function() {
    toDoList.deleteTask(this.id);
    $("#show-task").hide();
    displayTaskDetails(toDoList);
  });
};

$(document).ready(function() {
  attachTaskListeners();
  $("form#add-task").submit(function(event) {
    event.preventDefault();
    var inputtedTask = $("input#inputtedTask").val();
    $("input#inputtedTask").val("");
    var newTask = new Task(inputtedTask);
    toDoList.addTask(newTask);
    displayTaskDetails(toDoList);
  })
})
