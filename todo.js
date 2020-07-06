//抓取DOM元素
var todoData = [];
var addTodo = document.getElementById("addTodo");
var newTodo = document.getElementById("newTodo");
var todoList = document.getElementById("todoList");
var taskCount = document.getElementById("taskCount");
var clearTask = document.getElementById("clearTask");

//新增任務-綁定監聽事件
addTodo.addEventListener('click', addData);
//清除所有任務-綁定監聽事件
clearTask.addEventListener('click',deleteAll);
//單獨清除任務-綁定監聽事件
todoList.addEventListener('click',remove);
//新增任務-彙整資料
function addData(){
  if (newTodo.value.trim() !== '') {
    todoData.push({
      id: Math.floor(Date.now()), //回傳自 1970/01/01 00:00:00 UTC 起經過的毫秒數。
      title: newTodo.value,
      completed: false,
    })
    addTodoUpdate();
  }
}
//新增任務-更新畫面
function addTodoUpdate(){
  var str = '';
  todoData.forEach(function (item) {
    str += `<li class="list-group-item">
<div class="d-flex">
<div class="form-check">
<input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
<label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
</div>
<button type="button" class="close ml-auto" aria-label="Close">
<span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
</button>
</div>
</li>`;
  })
  todoList.innerHTML = str;
  taskCount.textContent = todoData.length;
  newTodo.value = '';  
};
//清除所有任務
function deleteAll(e){
  e.preventDefault();
  todoData = [];
  todoList.innerHTML = '';
  taskCount.textContent = todoData.length;
};
//清除任務-更新畫面
function render(){
  var str = '';
    todoData.forEach(function (item) {
      str += `<li class="list-group-item">
<div class="d-flex">
<div class="form-check">
<input type="checkbox" class="form-check-input" ${item.completed ? 'checked' : ''} data-action="complete" data-id="${item.id}">
<label class="form-check-label ${item.completed ? 'completed' : ''}" data-action="complete" data-id="${item.id}"> ${item.title}</label>
</div>
<button type="button" class="close ml-auto" aria-label="Close">
<span aria-hidden="true" data-action="remove" data-id="${item.id}">&times;</span>
</button>
</div>
</li>`;
    });
    todoList.innerHTML = str;
    taskCount.textContent = todoData.length;
}
//單項清除任務
function remove(e){
    var newIndex = 0;
  if (e.target.dataset.action == 'remove') {
    todoData.forEach(function (item, key) {
      if (e.target.dataset.id == item.id) {
        newIndex = key;
      }
    })
    todoData.splice(newIndex, 1);
    render();
  }
}


///不清楚這段程式碼的作用，發現這段即使刪除掉還是可以正常運作
todoList.addEventListener('click', function (e) {
  if (e.target.dataset.action == 'complete') {
    todoData.forEach(function (item) {
      if (e.target.dataset.id == item.id) {
        if (item.completed) {
          item.completed = false;
        } else {
          item.completed = true;
        }
      }
    })
    render();
  }
});