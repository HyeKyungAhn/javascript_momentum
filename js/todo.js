const todoForm = document.querySelector('#todoForm');
const todoInput = todoForm.querySelector('input');
const todoList = document.querySelector('#todoList');
const savedUsername = localStorage.getItem('username');
const TODOS_KEY = 'todos';
let todos = [];
let savedTodos = localStorage.getItem(TODOS_KEY);

if(savedTodos !== null){
    const parsedTodos = JSON.parse(savedTodos);
    parsedTodos.forEach(addTodoList);
    todos = parsedTodos; 
} else {
    const todoGuide = [
        {
            key: 1,
            value : '해야할 일을 완료 및 삭제할 수 있어요',
            check : false
        },
        {
            key: 2,
            value : 'todo 목록을 드래그해 순서를 바꿔 보세요',
            check : false
        }
    ];

    todos = todoGuide;
    todos.forEach(addTodoList);
    saveTodos();
}

todoForm.addEventListener('submit', handleTodoSubmit);

function handleTodoSubmit(event){
    const newTodo = todoInput.value;
    event.preventDefault();

    todoInput.value = '';
    const newTodoObj = {
        key : Date.now(),
        value : newTodo,
        check : false
    }

    todos.push(newTodoObj);
    addTodoList(newTodoObj);
    saveTodos();
}

function addTodoList(newTodoObj){
    const newList = document.createElement('li');
    newList.id = newTodoObj.key;
    newList.className = 'todoItem';
    newList.draggable = true;

    const newTodo = document.createElement('span');
    newTodo.innerText = newTodoObj.value;
    newTodo.className = 'todoContent';
    newList.appendChild(newTodo);
    
    const checkBtn = document.createElement('button');
    checkBtn.innerHTML = '&#10003;';
    checkBtn.className = 'todoBtn';
    newList.appendChild(checkBtn);
    checkBtn.addEventListener('click', handleCheckTodoBtn);

    const deleteBtn = document.createElement('button');
    deleteBtn.innerText = 'x';
    deleteBtn.className = 'todoBtn deleteTodoBtn';
    newList.appendChild(deleteBtn);
    deleteBtn.addEventListener('click', handleDeleteTodoBtn);

    if(newTodoObj.check==true){
        console.log(newList);
        newTodo.className += ' checkedTodo';
        checkBtn.className += ' greyText';
        deleteBtn.className += ' greyText';
    }

    todoList.appendChild(newList);
}

function handleDeleteTodoBtn(event){
    const li = event.target.parentElement;
    li.remove();
    // const index = todos.findIndex(x => x.key == li.id);
    // todos.splice(index, 1);
    todos = todos.filter(x => x.key !== parseInt(li.id));
    saveTodos();
}

function saveTodos(){
    localStorage.setItem(TODOS_KEY, JSON.stringify(todos));
}

function handleCheckTodoBtn(event){
    const elId = event.target.parentElement.id;

    const elIndex = todos.findIndex(i => i.key==elId);
    let checkValue = todos[elIndex].check;
    if(checkValue==true){
        console.log('check 해제');
        todos[elIndex].check = false;
    } else {
        console.log('check!');
        todos[elIndex].check = true;
    }
    paintGreyTodo(event.target);
    saveTodos();
}

function paintGreyTodo(target){
    const todoContent = target.parentElement.querySelector('.todoContent');
    const todoDeleteBtn = target.parentElement.querySelector('.deleteTodoBtn');
    
    todoContent.classList.toggle('checkedTodo');
    target.classList.toggle('greyText');
    todoDeleteBtn.classList.toggle('greyText');
}
/////////////////////////////////////////////////////////////////////////
// https://codepen.io/vtno/pen/MXmpoy

// const list = document.querySelector('#todoList');
const listItems = document.querySelectorAll('.todoItem');
const listHidden = document.querySelector('.listHidden');

// let dragIndex, dragSource

const getMouseOffset = (evt) => {
    const targetRect = evt.target.getBoundingClientRect();
    const offset = {
        x: evt.pageX - targetRect.left,
        y: evt.pageY - targetRect.top
    }
    return offset;
}

const getElementVerticalCenter = (el) => {
    const rect = el.getBoundingClientRect();
    return (rect.bottom - rect.top) / 2;
}

// const appendPlaceholder = (evt, idx) => {
//     evt.preventDefault()
//     if (idx === dragIndex) {
//         return
//     }
    
//     const offset = getMouseOffset(evt)
//     const middleY = getElementVerticalCenter(evt.target)
//     const placeholder = list.children[dragIndex]
    
//     // console.log(`hover on ${idx} ${offset.y > middleY ? 'bottom half' : 'top half'}`)
//     if (offset.y > middleY) {
//         list.insertBefore(evt.target, placeholder)
//     } else if (list.children[idx + 1]) {
//         list.insertBefore(evt.target.nextSibling || evt.target, placeholder)
//     }
//     return
//     }


function sortable(rootEl, onUpdate) {
    var dragEl; //li

   // Function responsible for sorting
    function _onDragOver(evt) { 
        evt.preventDefault();
        evt.dataTransfer.dropEffect = 'move';
    
        var target = evt.target; // drop target
        if (target && target !== dragEl && target.nodeName == 'LI') { //dragover가 되는 대상이 자기 자신이 아닌 다른 요소(LI)일 때
           // Sorting

            console.log('dragEl : ' + dragEl.id + ", target : " + target.id);

            const offset = getMouseOffset(evt); //drop
            const middleY = getElementVerticalCenter(evt.target);

            const dragElIndex = todos.findIndex(i => i.key==dragEl.id);
            const targetIndex = todos.findIndex(i => i.key==target.id);
            
            const dragElRef = todos[dragElIndex];

            if (offset.y > middleY) {
                rootEl.insertBefore(dragEl, target.nextSibling);
                todos.splice(targetIndex+1,0,dragElRef);
                // console.log(target.nextSibling.id);
                //경우의 수
                //제자리  splice(dragElIndex, 1); 유효
                //아래 splice(dragElIndex, 1); 유효
                //위 splice(dragElIndex+1, 1); 
            } else {
                rootEl.insertBefore(dragEl, target);
                todos.splice(targetIndex,0,dragElRef);
                //제자리  splice(dragElIndex, 1); 유효
                //아래 splice(dragElIndex, 1); 유효
                //위 splice(dragElIndex+1, 1); 
            }

            if(dragElIndex < targetIndex){
                todos.splice(dragElIndex, 1);
            } else {
                todos.splice(dragElIndex+1, 1);
            }
        }
    }

    function happen(){
        console.log('mouse up!!');
    }
    
    // End of sorting
    function _onDragEnd(evt){
        evt.preventDefault();

        // dragEl.classList.remove('ghost');
        rootEl.removeEventListener('dragover', _onDragOver, false);
        rootEl.removeEventListener('dragend', _onDragEnd, false);
        // rootEl.addEventListener('dragend', saveTodos);
        saveTodos();
       // Notification about the end of sorting
        onUpdate(dragEl);
    }

   // Sorting starts
    rootEl.addEventListener('dragstart', function (evt){
       dragEl = evt.target; // Remembering an element that will be moved
    
       // Limiting the movement type
        evt.dataTransfer.effectAllowed = 'move';
        evt.dataTransfer.setData('Text', dragEl.textContent);


       // Subscribing to the events at dnd
        rootEl.addEventListener('dragover', _onDragOver, false);
        rootEl.addEventListener('dragend', _onDragEnd, false);


        setTimeout(function () {
           // If this action is performed without setTimeout, then
           // the moved object will be of this class.
            // dragEl.classList.add('ghost');
        }, 0);
    }, false);
}

// Using                    
sortable(todoList, function (item) {
    console.log(item);
});

// 순서를 바꾸고 > 순서에 따라 todos를 변경
// > localStorage의 todos에 map객체를 저장해야하는데
