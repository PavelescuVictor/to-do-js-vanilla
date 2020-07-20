// App Class
class App {

    constructor(){
        this.selectedListFlag = false;
        this.lists = {};
        this.tags = [];
        this.selectorTags = [];
        
        // Try to load from localStorage or load placeholders
        if(Object.keys(window.localStorage).length > 0){
            console.log("Loading From Local Storage");
            //console.log(this);
            //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
            this.loadFromLocalStorage();
        }
        else {
            console.log("Local Storage Empty. Loading Placeholders.");
            // Loading placeholder tags
            const currentTags = document.querySelectorAll(".tag");
            currentTags.forEach(tag => {
                this.tags.push(tag.querySelector("p").innerText.toLowerCase());
            })

            // Loading placeholder lists
            const currentLists = document.querySelectorAll(".list__item");
            currentLists.forEach(list => {
                const listName = list.querySelector("p").innerText.toLowerCase();
                this.lists[listName] = {};
            });

            for(let list in this.lists){
                this.lists[list] = {};
            }

            // Update the local storage
            this.toLocalStorage();
            console.log(this);
            console.log(JSON.parse(localStorage.getItem("toDoAppData")));
        }
    }

    getSelectedListFlag (){
        return this.selectedListFlag;
    }

    getLists(){
        return this.lists;
    }

    getTags(){
        return this.tags;
    }

    getSelectorTags(){
        return this.selectorTags;
    }

    setSelectedListFlag(selectedListFlag){
        this.selectedListFlag = selectedListFlag;
    }

    setLists(lists){
        this.lists = lists;
    }

    setTags(tags){
        this.tags = tags;
    }

    setSelectorTags(selectorTags){
        this.selectorTags = selectorTags;
    }

    toLocalStorage(){
        localStorage.setItem('toDoAppData', JSON.stringify(this));
    }

    static deleteFromLocalStorage(){
        delete localStorage["toDoAppData"];
    }

    loadFromLocalStorage(){
        const app = JSON.parse(localStorage.getItem("toDoAppData"));
        this.setSelectedListFlag(false);
        this.setLists(app["lists"]);
        this.setTags(app["tags"]);
        //this.setSelectorTags(app["selectorTags"]);

        // Construct the lists
        const todoList = document.querySelector(".list__content");

        // Deleting current lists
        const lists = todoList.querySelectorAll(".list__item");
        lists.forEach(list =>{
            todoList.removeChild(list);
        });

        for(let list in this.lists){
            const div = document.createElement("div");
            div.classList.add("list__item");
            const paragraph = document.createElement("p");
            paragraph.innerText = list;
            div.appendChild(paragraph);
            todoList.appendChild(div);
        }

        // Construct tag list
        const todoTags = document.querySelector(".tags__content");

        // Deleting current tags
        const tags = todoTags.querySelectorAll(".tag");
        tags.forEach(tag => {
            todoTags.removeChild(tag);
        });

        this.tags.forEach(tag => {
            const div = document.createElement("div");
            div.classList.add("tag");
            const iElement = document.createElement("i");
            iElement.classList.add("fas");
            iElement.classList.add("fa-square");
            const paragraph = document.createElement("p");
            paragraph.innerText = tag;
            div.appendChild(iElement);
            div.appendChild(paragraph);
            todoTags.appendChild(div);
        });
    }

    addList(listName){
        this.lists[listName] = {};

        // Updating the localstorage
        this.toLocalStorage();
        
        //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
    }

    deleteList(listName){
        delete this.lists[listName];
        this.setSelectedListFlag(false);

        // Updating the localstorage
        this.toLocalStorage();

        //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
    }

    addTag(tagName){
        this.tags.push(tagName);

        // Updating the localstorage
        this.toLocalStorage();
        
        //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
    }

    deleteTag(tagName){
        let filtered = this.tags;
        filtered = filtered.filter(element => {
            if(element != tagName){
                return element;
            }
        });
        this.tags = filtered;

        // Updating the localstorage
        this.toLocalStorage();

        //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
    }

    addListElement(listName, elementName, tagList){
        this.lists[listName][elementName] = [];
        this.lists[listName][elementName] = tagList;

        // Updating the localstorage
        this.toLocalStorage();

        //console.log(JSON.parse(localStorage.getItem("toDoAppData")));

    }

    deleteElement(listName, elementName){
        delete this.lists[listName][elementName];

        // Updating the localstorage
        this.toLocalStorage();

        //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
    }

    addSelectorTags(selectorTag){
        this.selectorTags.push(selectorTag);

        // Updating the localstorage
        this.toLocalStorage();

        //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
    }

    deleteSelectorTags(selectorTag){
        let filtered = this.selectorTags;
        filtered = filtered.filter(element => {
            if(element != selectorTag){
                return element
            }
        });
        this.selectorTags = filtered;

        // Updating the localstorage
        this.toLocalStorage();

        //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
    }
}


// Creating an empty object and saving it into localstorage.
//App.deleteFromLocalStorage();
let toDoAppData = new App();


// Add Event listeners to the sidevar New button
const addFormButton = document.querySelectorAll(".add__button");
addFormButton[0].addEventListener("click", switchAddFormState);
addFormButton[1].addEventListener("click", switchAddFormState);

// Add Event Listeners to the form add button
const formInputAddButton = document.querySelectorAll(".form__button-add");
formInputAddButton[0].addEventListener("click", addList);
formInputAddButton[1].addEventListener("click", addTag);
formInputAddButton[2].addEventListener("click", addListElement);


// Add event listener to the sidebar list of lists
const listContent = document.querySelector(".list__content");
listContent.addEventListener("click", checkClickedList);


// Show topbar input form variables
const showFormButton = document.querySelector(".topbar__button-plus");
showFormButton.addEventListener("click", switchShowFormState);

// Delete list event listener
const deleteListButton = document.querySelector(".topbar__button-trash");
deleteListButton.addEventListener("click", deleteList);

// Delete tag event listener
const tag = document.querySelector(".tags__content");
tag.addEventListener("click", checkClickedTag);

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
        formDiv.style.display = "block";
        updateTagListSelector();
        // Adding event listeners for the select tag
        const selectTag = document.getElementById("tags");
        selectTag.selectedIndex = -1;
        selectTag.addEventListener("change", addTagToElement);
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

// Add tag to the tags list in the new element form
function addTagToElement(event){
    const li = document.createElement("li");
    li.innerText = event.target.value;

    const tagsList = document.querySelector(".tags__list");
    let tagListNames = [];
    tagsList.querySelectorAll("li").forEach(tag => {
        tagListNames.push(tag.innerText);
    });

    // Check if added tag not already in
    if (!tagListNames.includes(li.innerText)){
        tagsList.appendChild(li);
    }
    else {
        event.currentTarget.parentNode.querySelector(".form__input-add").placeholder = `"${li.innerText}" already added.`;
    }
}

// Adding to the list of lists
function addList(event){
    // Prevent form from submitting
    event.preventDefault();

    const formInput = document.querySelectorAll(".form__input-add")[0];
    const todoList = document.querySelector(".list__content");

    if (formInput.value !== ""){
        if(!(formInput.value.toLowerCase() in toDoAppData.getLists())){
            formInput.placeholder ="Enter list name";
            const div = document.createElement("div");
            div.classList.add("list__item");
            const paragraph = document.createElement("p");
            paragraph.innerText = formInput.value;
            div.appendChild(paragraph);
            todoList.appendChild(div);
    
            // Add list to the main object
            toDoAppData.addList(formInput.value.toLowerCase());
    
            formInput.value = "";
        }
        else{
            formInput.value = "";
            formInput.placeholder = "List name already exists";
        }
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
        // Check if the input values is present in the list of current tags names. If its not present go ahead and add it. If its present then don't.
        if (!toDoAppData.getTags().includes(formInput.value.toLowerCase())){
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

            // Add tag to the main object
            toDoAppData.addTag(formInput.value.toLowerCase());

            // Add tag to the main object selector tags
            toDoAppData.addSelectorTags(formInput.value.toLowerCase());

            // Update Tag List Selector;
            updateTagListSelector()

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
}

// Delete list 
function deleteList(event){
    if(!toDoAppData.getSelectedListFlag() === false){
        const listName = event.currentTarget.parentNode.querySelector("h1").innerText;
        const list = document.querySelector(".list__content");
        const lists = document.querySelectorAll(".list__item");

        // Deleting the list from the DOM
        lists.forEach(l => {
            if(l.querySelector("p").innerText === listName){
                list.removeChild(l);
            }
        });

        // Updating selected list in the DOM
        event.currentTarget.parentNode.querySelector("h1").innerText = "";

        // Updating displayed list element
        const mainList = document.querySelector(".main__list");
        const listElements = mainList.querySelectorAll(".list__element");
        listElements.forEach(element =>{
            mainList.removeChild(element);
        });
    

        // Deleting list from the main object
        toDoAppData.deleteList(listName.toLowerCase());
    }
    else{
        console.log("No list selected");
    }
}

// Delete tag
function deleteTag(tagName){
    const tagList = document.querySelector(".tags__content");
    const tags = tagList.querySelectorAll(".tag");

    // Deleting the tag from the DOM
    tags.forEach(tag => {
        if(tag.querySelector("p").innerText === tagName){
            tagList.removeChild(tag);
        }
    });

    // Deleting tag from the main object
    toDoAppData.deleteTag(tagName.toLowerCase());

    // Updating selector's tag list in the DOM
    updateTagListSelector();
    //console.log(JSON.parse(localStorage.getItem("toDoAppData")));
}

// Check the clicked element in the sidebar list content
function checkClickedList(event){
    if (!(event.target.innerText.toLowerCase() === toDoAppData.getSelectedListFlag())){
        let targetElement = event.target;
        let selector = "p";
        if (targetElement.nodeName === selector.toUpperCase()){
            // Set selected flag to the main object
            toDoAppData.selectedListFlag = targetElement.innerText.toLowerCase();
    
            // Update the local storage
            toDoAppData.toLocalStorage();
            changeDisplayedList(targetElement.parentNode);
        }
    }
    else{
        console.log("List already selected.");
    }
}

// Check the clicked tag in the sidebar tag content
function checkClickedTag(event){
    let targetElement = event.target;
    let selector = "p";
    if(targetElement.nodeName === selector.toUpperCase()){
        const tagName = targetElement.innerText;
        deleteTag(tagName);
    }
}

// Change the current displayed list
function changeDisplayedList(element){

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
    topbarListName.innerText = toDoAppData.getSelectedListFlag();

    // Display the correct list items;
    const elementList = document.querySelector(".main__list");
    const listName = toDoAppData.getSelectedListFlag();

    // Deleting current list items if existent
    const elements = elementList.querySelectorAll(".list__element");
    elements.forEach(element => {
        elementList.removeChild(element);
    });
    if(!elementList.children.length === 0){
        console.log(elementList.children);
    }
    else{
        for(element in toDoAppData.getLists()[listName]){
            const divOuter = document.createElement("div");
            divOuter.classList.add("list__element");
    
            const divInner = document.createElement("div");
            divInner.classList.add("element__topbar");
            const li = document.createElement("li");
            li.innerText = element;
            divInner.appendChild(li);
            const buttonFirst = document.createElement("button");
            const iFirst = document.createElement("i");
            iFirst.classList.add("fas");
            iFirst.classList.add("fa-angle-left");
            buttonFirst.appendChild(iFirst);
    
            // Add Event Listener to the first button(show tag list)
            buttonFirst.addEventListener("click", showTagList);
            
            const buttonSecond = document.createElement("button");
            const iSecond = document.createElement("i");
            iSecond.classList.add("fas");
            iSecond.classList.add("fa-check-square");
            buttonSecond.appendChild(iSecond);

            // Add Event Listener to the second button(element done)
            buttonSecond.addEventListener("click", completeElement);
    
            const buttonThird = document.createElement("button");
            const iThird = document.createElement("i");
            iThird.classList.add("fas");
            iThird.classList.add("fa-trash-alt");
            buttonThird.appendChild(iThird);
    
            // Add Event Listener to the third button(delete current element)
            buttonThird.addEventListener("click", deleteListElement);
    
            divInner.appendChild(buttonFirst);
            divInner.appendChild(buttonSecond);
            divInner.appendChild(buttonThird);
            divOuter.appendChild(divInner);
            elementList.appendChild(divOuter);
    
            // Adding tags list
            const tagsList = toDoAppData.getLists()[listName][element];
            const divInnerTags = document.createElement("div");
            divInnerTags.classList.add("element__tags");
            const ul = document.createElement("ul");
            ul.classList.add("tags__list");
            tagsList.forEach(tag => {
                const li = document.createElement("li");
                li.innerText = tag;
                ul.appendChild(li);
            })
            divInnerTags.appendChild(ul);
            divOuter.appendChild(divInnerTags);
        };
    }
}

// Get list of classes
function getClassList(){
    const classList = document.querySelectorAll(".list__item");
    return classList;
}

// Update tag list selector
function updateTagListSelector(){
    let tagListSelector = document.getElementById("tags");

    // Check wether the selector is empty or not. If empty just add the all the tags if not check which one is new.
    if (tagListSelector.length === 0){
        // Adding to the select tag list
        toDoAppData.getTags().forEach(tag => {
            const option = document.createElement("option");
            option.value = tag;
            option.innerText = tag;
            tagListSelector.appendChild(option);
            toDoAppData.addSelectorTags(option.innerText.toLowerCase());
        });
    }
    else {
        // Deleting every tag in the selector's tag list from the DOM
        const tags = tagListSelector.querySelectorAll("option");
        tags.forEach(tag => {
            tagListSelector.removeChild(tag);
            toDoAppData.deleteSelectorTags(tag.innerText.toLowerCase());
        });

        // Adding current tags from the sidebar tags list to the selector's tag list in the DOM
        toDoAppData.getTags().forEach(tag => {
            const option = document.createElement("option");
            option.value = tag;
            option.innerText = tag;
            tagListSelector.appendChild(option);
            toDoAppData.addSelectorTags(tag.toLowerCase());
        });
    }
}

// Shows the tag list for each main list element
function showTagList(event){
    const elementTagList = event.currentTarget.parentNode.parentNode.querySelector(".element__tags");

    if (elementTagList.style.display === "none" || elementTagList.style.display == ""){
        elementTagList.style.display = "block";
        event.currentTarget.classList.add("element__button-clicked");
    }
    else if (elementTagList.style.display === "block") {
        elementTagList.style.display = "none";
        event.currentTarget.classList.remove("element__button-clicked");
    }
    else {
        elementTagList.style.display = "none";
    }
}

// Add new list element
function addListElement(event){
    // Prevent form from submitting
    event.preventDefault();

    const formInput = document.querySelectorAll(".form__input-add")[2];
    const elementList = document.querySelector(".main__list");

    // Check if any list selected
    if(!toDoAppData.getSelectedListFlag() === false){
        if (formInput.value !== ""){
            const divOuter = document.createElement("div");
            divOuter.classList.add("list__element");

            const divInner = document.createElement("div");
            divInner.classList.add("element__topbar");
            const li = document.createElement("li");
            li.innerText = formInput.value;
            divInner.appendChild(li);
            const buttonFirst = document.createElement("button");
            const iFirst = document.createElement("i");
            iFirst.classList.add("fas");
            iFirst.classList.add("fa-angle-left");
            buttonFirst.appendChild(iFirst);

            // Add Event Listener to the first button(show tag list)
            buttonFirst.addEventListener("click", showTagList);
            
            const buttonSecond = document.createElement("button");
            const iSecond = document.createElement("i");
            iSecond.classList.add("fas");
            iSecond.classList.add("fa-check-square");
            buttonSecond.appendChild(iSecond);

            // Add Event Listener to the second button(element done)
            buttonSecond.addEventListener("click", completeElement);

            const buttonThird = document.createElement("button");
            const iThird = document.createElement("i");
            iThird.classList.add("fas");
            iThird.classList.add("fa-trash-alt");
            buttonThird.appendChild(iThird);

            // Add Event Listener to the third button(delete current element)
            buttonThird.addEventListener("click", deleteListElement);

            divInner.appendChild(buttonFirst);
            divInner.appendChild(buttonSecond);
            divInner.appendChild(buttonThird);
            divOuter.appendChild(divInner);
            elementList.appendChild(divOuter);

            // Adding tags list
            const tagsList = event.currentTarget.parentNode.parentNode.querySelector(".tags__list").querySelectorAll("li");
            const divInnerTags = document.createElement("div");
            divInnerTags.classList.add("element__tags");
            const ul = document.createElement("ul");
            ul.classList.add("tags__list");
            tagsList.forEach(tag => {
                ul.appendChild(tag);
            })
            divInnerTags.appendChild(ul);
            divOuter.appendChild(divInnerTags);

            // Adding the element to the list in the main object
            const tagsListNames = []
            tagsList.forEach(tag => {
                tagsListNames.push(tag.innerText.toLowerCase());
            });
            toDoAppData.addListElement(toDoAppData.getSelectedListFlag().toLowerCase(), formInput.value.toLowerCase(), tagsListNames);

            // Changing input value from the form to empty
            formInput.value = "";
            formInput.placeholder = "Enter the name of the item";
        }
        else {
            formInput.placeholder = "Not valid";
        }
    }
    else{
        formInput.value = "";
        formInput.placeholder = "Please select a list";
    }
}

// Delete element of the list
function deleteListElement(event){
    const element = event.currentTarget.parentNode.parentNode;
    const parent = event.currentTarget.parentNode.parentNode.parentNode;
    parent.removeChild(element);
    
    // Deleting from the main object
    const elementTopbar = element.querySelector(".element__topbar");
    const elementName = elementTopbar.querySelector("li").innerText;
    const list = document.querySelector(".topbar");
    const listName = list.querySelector("h1").innerText;
    toDoAppData.deleteElement(listName.toLowerCase(), elementName.toLowerCase());
}

// Mark list element as completed element
function completeElement(event){
    const parent = event.currentTarget.parentNode.parentNode
    if(parent.classList.contains("completed-element")){
        parent.classList.remove("completed-element");
        const tagsList = parent.querySelector(".tags__list");
        tagsList.classList.remove("completed-tag");
    }
    else{
        parent.classList.add("completed-element");
        const tagsList = parent.querySelector(".tags__list");
        tagsList.classList.add("completed-tag");
    }
}