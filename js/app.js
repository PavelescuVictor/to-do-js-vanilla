// List/Tag add variables
const addFormButton = document.querySelectorAll(".add__button");
const formInputAddButton = document.querySelectorAll(".form__button-add");


// Change list display variables
let selectedList = {
    selected: null,
    list: null,
};

const listContent = document.querySelector(".list__content");
const classLists = getClassList();

// Show topbar input form variables
const showFormButton = document.querySelector(".topbar__button-plus");


// Event Listeners
addFormButton[0].addEventListener("click", switchAddFormState);
addFormButton[1].addEventListener("click", switchAddFormState);

formInputAddButton[0].addEventListener("click", addList);
formInputAddButton[1].addEventListener("click", addTag);

showFormButton.addEventListener("click", switchShowFormState);

listContent.addEventListener("click", checkClickedElement);


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
    if (addForm.style.display === "none" || addForm.style.display == ""){
        addForm.style.display = "flex";
    }
    else if (addForm.style.display === "flex") {
        addForm.style.display = "none";
    }
    else {
        addForm.style.display = "none";
    }
}

function switchShowFormState(event){

    const parent = event.currentTarget.parentNode.parentNode;
    const formDiv = parent.querySelector(".topbar__input");
    const topbar = parent.querySelector(".topbar")

    if (formDiv.style.display === "none" || formDiv.style.display == ""){
        topbar.style.borderBottomRightRadius = "0px";
        topbar.style.borderBottomLeftRadius = "0px";
        const tagList = getTagList();
        updateTagListSelector(tagList);
        formDiv.style.display = "block";
    }
    else if (formDiv.style.display === "block") {
        topbar.style.borderBottomRightRadius = getComputedStyle(document.documentElement).getPropertyValue("--border-radius-blocks");
        topbar.style.borderBottomLeftRadius = getComputedStyle(document.documentElement).getPropertyValue("--border-radius-blocks");
        formDiv.style.display = "none";
    }
    else {
        formDiv.style.display = "none";
    }
}

// Adding to the list of lists
function addList(event){
    // Prevent form from submitting
    event.preventDefault();

    const formInput = document.querySelectorAll(".form__input-add")[0];
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

// Adding to the list of tags
function addTag(event){
    // Prevent form from submitting
    event.preventDefault();

    const formInput = document.querySelectorAll(".form__input-add")[1];
    const todoTags = document.querySelector(".tags__content");

    // Check wheter the input value is null or not so you cant introduce null value
    if (formInput.value !== ""){
        const tagList = getTagList();
        const tagListNames = [];
        // Check if the current list of tags is empty or not. If not empty create a list of current tags names.
        if (!tagList.length == 0){
            tagList.forEach(tag => {
                tagListNames.push(tag.innerText);
            });
        }
        // Check if the input values is present in the list of current tags names. If its not present go ahead and add it. If its present then don't.
        if (!tagListNames.includes(formInput.value)){
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
        else{
            formInput.value = "";
            formInput.placeholder = "Tag name already exists";
        }
    }
    else {
        formInput.placeholder = "Not valid";
    }
    
    //Updating list of tags from the topbar input form
    const tagList = getTagList();
    updateTagListSelector(tagList);
}

// Get list of classes
function getClassList(){
    const classList = document.querySelectorAll(".list__item");
    return classList;
}

// Get list of tags
function getTagList(){
    const tagList = document.querySelectorAll(".tag");
    return tagList;
}

// Check the clicked element in the sidebar list content
function checkClickedElement(event){
    let targetElement = event.target;
    let selector = "p";
    if (targetElement.nodeName === selector.toUpperCase()){
        changeDisplayedList(targetElement.parentNode);
    }
}

// Change the current displayed list
function changeDisplayedList(element){

    const listName = element.querySelector("p").innerText;
    const list = element;
    const classList = getClassList();

    // Change sidebar style
    classList.forEach(element => {
        if (element.classList.contains("selected-list")){
            element.classList.remove("selected-list");
        }
    });
    list.classList.add("selected-list");

    // Change list name in the main part of the application
    const topbarListName = document.querySelector(".topbar h1");
    topbarListName.innerText = listName;
}

// Update tag list selector
function updateTagListSelector(tagList){
    let tagListSelector = document.getElementById("tags");

    // Check wether the selector is empty or not. If empty just add the all the tags if not check which one is new.
    if (tagListSelector.length === 0){
        // Adding to the select tag list
        tagList.forEach(tag => {
            const option = document.createElement("option");
            option.value = tag.querySelector("p").innerText;
            option.innerText = tag.querySelector("p").innerText;
            tagListSelector.appendChild(option);
        })
    }
    else {
        // Creating a list of new options to add in the tapbar selector
        let optionList = [];
        tagList.forEach(tag => {
            const option = document.createElement("option");
            option.value = tag.querySelector("p").innerText;
            option.innerText = tag.querySelector("p").innerText;
            optionList.push(option);
        })

        // Create an array of names containing every existing name in the topbar selector
        let tagListSelectorNames = [];
        tagListSelectorOption = tagListSelector.querySelectorAll("option");
        tagListSelectorOption.forEach(tag => {
            tagListSelectorNames.push(tag.innerText);
        })

        // Adding the option to the topbar selector if its not contained in the array created above
        optionList.forEach(option => {
            if (!Object.values(tagListSelectorNames).includes(option.innerText)){
                tagListSelector.appendChild(option);
            }
        })
    }
}