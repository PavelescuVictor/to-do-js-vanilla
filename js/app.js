// List add variables
const addButton = document.querySelectorAll(".add__button");
const formInputAddButton = document.querySelectorAll(".form__button-add");


// Event Listeners
addButton[0].addEventListener("click", switchAddFormState);
addButton[1].addEventListener("click", switchAddFormState);

formInputAddButton[0].addEventListener("click", addList);
formInputAddButton[1].addEventListener("click", addTag);


// Functions

// Turning Add Form On/Off
function switchAddFormState(event){

    const parent = event.currentTarget.parentNode.parentNode;
    let addForm;

    if (parent.classList[0] == "sidebar__list"){
        addForm = document.querySelectorAll(".add__form")[0];
    }
    else if (parent.classList[0] == "sidebar__tags"){
        addForm = document.querySelectorAll(".add__form")[1];
    }

    if (addForm.style.display === "none"){
        addForm.style.display = "flex";
    }
    else if (addForm.style.display === "flex") {
        addForm.style.display = "none";
    }
    else {
        addForm.style.display = "none";
    }
}

// Adding to the list of lists
function addList(event){
    // Prevent form from submitting
    event.preventDefault();

    const formInput = document.querySelectorAll(".form__input-add")[0];
    console.log(formInput);
    const todoList = document.querySelector(".list__content");

    if (formInput.value !== ""){
        formInput.placeholder ="Enter list name";
        const div = document.createElement("div");
        div.classList.add("list__item");
        const paragraph = document.createElement("p");
        paragraph.innerText = formInput.value;
        div.appendChild(paragraph);
        todoList.appendChild(div);
        formInput.value = "";
    }
    else {
        formInput.placeholder = "Not valid";
    }
}

//Adding to the list of tags
function addTag(event){
    // Prevent form from submitting
    event.preventDefault();

    const formInput = document.querySelectorAll(".form__input-add")[1];
    console.log(formInput);
    const todoTags = document.querySelector(".tags__content");

    if (formInput.value !== ""){
        formInput.placeholder = "Enter tag name";
        const div = document.createElement("div");
        div.classList.add("tag");
        const iElement = document.createElement("i");
        iElement.classList.add("fas");
        iElement.classList.add("fa-square");
        const paragraph = document.createElement("p");
        paragraph.innerText = formInput.value;
        div.appendChild(iElement);
        div.appendChild(paragraph);
        todoTags.appendChild(div);
        formInput.value = "";
    }
    else {
        formInput.placeholder = "Not valid";
    }
}