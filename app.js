const InputText = document.getElementById("InputText");
const AddButton = document.getElementById("addButton");
const list = document.getElementById("list");
const ClearButton=document.getElementById("Clear");
const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let arrayvalue=[];

if(window.localStorage.getItem("LocalStorageArray")!==null){
  arrayvalue=JSON.parse(window.localStorage.getItem("LocalStorageArray"));
  AddTasksToTasksListFrom("LocalStorageArray");
}

else{
    arrayvalue=[];
}

let TasksArray =arrayvalue; 



AddButton.addEventListener("mouseup", addBlackborderAddButton);
AddButton.addEventListener("mousedown", removeBlackborderAddButton);
ClearButton.addEventListener("mouseup", addBlackborderClearButton);
ClearButton.addEventListener("mousedown", removeBlackborderClearButton);
AddButton.addEventListener("click", addTaskList);
ClearButton.addEventListener("click",removeAllTasks)
list.addEventListener("mouseover", changeColorOfTaskElement);
list.addEventListener("mouseout", returnColorOfTaskElement);
list.addEventListener("click", taskCompleted);


function addTaskToTaskArray(InputTask) {
    let taskOpject = {
        /*(new Date().getHours()-12)+":"+new Date().getMinutes()+":"+new Date().getSeconds()+"  "+"  "+(new Date().getMonth()+1)+'/'+new Date().getDate()+'/'+new Date().getFullYear(),*/
        id: (new Date().getHours() - (new Date().getHours() >= 12 ? 12 : 0)) + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " " + (new Date().getHours() >= 12 ? "PM" : "AM") + " " + weekday[new Date().getDay()] + "  " + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear(),
        TaskTittle: InputTask,
        Completed: false
    };
    TasksArray.push(taskOpject);

}

function addArrayToLocalStorage(array){
let JsonArray=JSON.stringify(array);
let key="LocalStorageArray";
window.localStorage.setItem(key,JsonArray);
return key;

}

function AddTasksToTasksListFrom(key) {
    list.innerHTML = "";
    let counter = 1;

    let ArrayOfTasks=JSON.parse(window.localStorage.getItem(key));
    ArrayOfTasks.forEach(task => {
        let TaskElement = document.createElement("div");
        TaskElement.setAttribute("id", task.id);


        let TaskElementTitle = document.createElement("div");
        if( task.Completed){TaskElementTitle.classList.add("done")}
        TaskElementTitle.innerHTML = counter + "-" + task.TaskTittle;
        TaskElement.appendChild(TaskElementTitle);
        
        let TaskElementStartDate = document.createElement("div");
        TaskElementStartDate.innerHTML = "date of adding to the list:" + task.id;
        TaskElementStartDate.classList.add("datestart-end");
        TaskElement.appendChild(TaskElementStartDate);

      
           if(task.Completed){
           let TaskElementendtDate = document.createElement("div");
           TaskElementendtDate.innerHTML = " date of its completion:" +(new Date().getHours() - (new Date().getHours() >= 12 ? 12 : 0)) + ":" + new Date().getMinutes() + ":" + new Date().getSeconds() + " " + (new Date().getHours() >= 12 ? "PM" : "AM") + " " + weekday[new Date().getDay()] + "  " + (new Date().getMonth() + 1) + '/' + new Date().getDate() + '/' + new Date().getFullYear();
           TaskElementendtDate.classList.add("datestart-end");
           TaskElement.appendChild(TaskElementendtDate);
        }

        let DeletButton=document.createElement("button");
        DeletButton.classList.add("delete-button");
        DeletButton.innerHTML="delete";
        TaskElement.appendChild(DeletButton);
            
        

        task.Completed?TaskElement.classList.add("task-element","donetask-element"):TaskElement.classList.add("task-element");
        list.appendChild(TaskElement);
        
        
        counter++;
        if (counter > 7) {
            list.setAttribute("style", "height:auto");
        }

        else{
            list.removeAttribute("style");
        }

    } 
    )
}

function addTaskList(event) {
    if (InputText.value != "") {
        addTaskToTaskArray(InputText.value);
        InputText.value = "";
        AddTasksToTasksListFrom(addArrayToLocalStorage(TasksArray));
    }



}
function addBlackborderAddButton(event) {
    event.target.classList.toggle("addButtonClass");
}

function removeBlackborderAddButton(event) {

    if (event.target.classList.contains("addButtonClass")) {
        event.target.classList.remove("addButtonClass");
    }


}

function addBlackborderClearButton(event) {
    event.target.classList.toggle("clearButtonClass");
}

function removeBlackborderClearButton(event) {

    if (event.target.classList.contains("clearButtonClass")) {
        event.target.classList.remove("clearButtonClass");
    }


}




function changeColorOfTaskElement(event) {
    if ((event.target.classList.contains("task-element"))) {

        event.target.setAttribute("style", "background-color:#FEDEFF;");      
    }

    else if (event.target.parentElement.classList.contains("task-element")) {
        event.target.parentElement.setAttribute("style", "background-color:#FEDEFF;");
    }

}

function returnColorOfTaskElement(event) {
    if (event.target.classList.contains("task-element") ) {
        event.target.removeAttribute("style");

        
    }

   else if (event.target.parentElement.classList.contains("task-element")) {
        event.target.parentElement.removeAttribute("style", "background-color:#FEDEFF;");
    }
}

function taskCompleted(event) {
    if (event.target.classList.contains("task-element")) {
        for (let i = 0; i < TasksArray.length; i++) {

            if (TasksArray[i].id === event.target.getAttribute("id")) {
                TasksArray[i].Completed?TasksArray[i].Completed = false:TasksArray[i].Completed = true;
                AddTasksToTasksListFrom(addArrayToLocalStorage(TasksArray));
            }



        }

    }

    else if (event.target.parentElement.classList.contains("task-element")&&(event.target.classList.contains("delete-button")!=1)) {
        for (let i = 0; i < TasksArray.length; i++) {

            if (TasksArray[i].id === event.target.parentElement.getAttribute("id")) {
                TasksArray[i].Completed?TasksArray[i].Completed = false:TasksArray[i].Completed = true;
                AddTasksToTasksListFrom(addArrayToLocalStorage(TasksArray));
            }
        }
    }

    else if((event.target.classList.contains("delete-button"))){

        for (let i = 0; i < TasksArray.length; i++) {

            if (TasksArray[i].id === event.target.parentElement.getAttribute("id")) {
                TasksArray.splice(i,1);
                AddTasksToTasksListFrom(addArrayToLocalStorage(TasksArray));
            }
        }
    

    }
}

function removeAllTasks(event){
if(event.target.classList.contains("clearButtonClass")){
TasksArray.length>=7?list.removeAttribute("style"):0;
window.localStorage.clear();
TasksArray=[];
AddTasksToTasksListFrom(addArrayToLocalStorage(TasksArray));

}

}