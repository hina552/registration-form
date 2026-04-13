let submitForm = document.querySelector("#form");
let lastName = document.querySelector("#last-name");
let firstName = document.querySelector("#first-name");
let errorMsgLast = document.querySelector(".error-msg-last");
let errorMsgFirst = document.querySelector(".error-msg-first");
let email = document.querySelector("#email");
let errorMsgEmail = document.querySelector(".error-msg-email");
let maleChoice = document.querySelector("#male");
let femaleChoice = document.querySelector("#female");
let errorMsgRadio = document.querySelector(".error-msg-radio");
let filiere = document.querySelector("#filiere");
let webOption = document.querySelector("#web");
let mobileOption = document.querySelector("#mobile");
let selectGroup = document.querySelector("#group-select");
let selectErrorMsg = document.querySelector(".error-msg-select");
let checkBoxes = document.querySelectorAll(".clubs input[type='checkbox']");
let checkboxErrorMsg = document.querySelector(".error-msg-checkbox");
let allErrorsMsgs = document.querySelectorAll("form div.error");
let form = document.querySelector("form");

//the dropdown select box event //
filiere.addEventListener("change", (event)=>{
        selectGroup.innerHTML = "<option disabled selected='' value=''>Choisir un groupe</option>";
    if(event.target.value === "web"){
    selectGroup.disabled = false;
   let option1 =  document.createElement("option");
   option1.value = "DEV 101";
   option1.textContent = "DEV 101";
   let option2 = document.createElement("option");
   option2.value = "DEV 102";
   option2.textContent = "DEV 102";
   let option3 = document.createElement("option");
   option3.value = "DEV 103";
   option3.textContent = "DEV 103";
   //appending children //
   selectGroup.appendChild(option1);
   selectGroup.appendChild(option2);
   selectGroup.appendChild(option3);
   

}
else if(event.target.value === "mobile"){
    selectGroup.disabled = false;
    selectGroup.textContent = "";
    //creating options//
    let optionDisabled = document.createElement("option");
    let option1 = document.createElement("option");
    let option2 = document.createElement("option");
    let option3 = document.createElement("option");
    //adding values and content to the options
    optionDisabled.value = "";
    optionDisabled.disabled = true;
    optionDisabled.selected = true;
    optionDisabled.textContent = "Choisir un groupe";
    option1.value = "MOB 201";
    option2.value = "MOB 202";
    option3.value = "MOB 203";
    option1.textContent = "MOB 201";
    option2.textContent = "MOB 202";
    option3.textContent = "MOB 203";
    //appending child elements//
    selectGroup.appendChild(optionDisabled);
    selectGroup.appendChild(option1);
    selectGroup.appendChild(option2);
    selectGroup.appendChild(option3);
}

});

let count = 0;
let femaleCount = 0;
let maleCount = 0;
let webCount = 0;
let mobileCount = 0;

//the submit event starts here//
submitForm.addEventListener("submit", (event)=>{
event.preventDefault();
let trimmedLast = lastName.value.trim();
let trimmedFirst = firstName.value.trim();
let trimmedEmail = email.value.trim();
if(lastName.value === "" || trimmedLast.length === 0){
    errorMsgLast.textContent = "this field cannot be empty or just spaces";
}
else{
    errorMsgLast.textContent = "";
}
if(trimmedFirst === ""){
    errorMsgFirst.textContent = "this field cannot be empty or just spaces";

}
else{
    errorMsgFirst.textContent = "";
}
if(trimmedEmail === "" || !(trimmedEmail.endsWith("@ofppt.ma"))){
    errorMsgEmail.textContent = "this field cannot be empty and should end with'@ofppt.ma'";

}
else{
    errorMsgEmail.textContent = "";
} //radio validation
if(!(maleChoice.checked) && !(femaleChoice.checked)){
errorMsgRadio.textContent = "check your gender";
}
else{
    errorMsgRadio.textContent = "";
}
if(filiere.value === "" || selectGroup.value === ""){
    selectErrorMsg.textContent = "You must select a filiere and a group";

}
else{
    selectErrorMsg.textContent = "";
}
//checking checked checkboxes

let sumOfCheckboxes = Array.from(checkBoxes).reduce((accumulator, checkbox)=>{
    return accumulator + checkbox.checked;}, 0);
if(sumOfCheckboxes < 1 || sumOfCheckboxes > 2){
    let clubsDivs = document.querySelectorAll(".clubs div:not(.error-msg-checkbox)");
    clubsDivs.forEach(div =>{div.style.marginBottom = "-10px"});
    checkboxErrorMsg.textContent = "You must check 2 clubs at max";

}
else{
    checkboxErrorMsg.textContent = "";
}
//checking if any error is there if not then start fetching data and creating tables
let arrayOfErrors = Array.from(allErrorsMsgs);
let invalidForm = arrayOfErrors.some(error =>{ return error.textContent !== ""});
if(!(invalidForm)){
    //getting the checked radio text
    function getRadioText(){
        let radios = document.querySelectorAll("input[type='radio']");
    let checkedRadio = Array.from(radios).filter(radio=> radio.checked);
    let radioId = checkedRadio[0].id;
    let labelText = document.querySelector(`label[for='${radioId}']`).textContent;
    return labelText;
    }
    //getting the selected filiere text
    /*selectedIndex is a built in property that returns the index of the selected option which is in this 
    case an object inside an array since options returns an array of the select options*/
    let selectedFiliere = filiere.options[filiere.selectedIndex].text;
    //getting the selected group text
    let selectedGroup = selectGroup.options[selectGroup.selectedIndex].text;
    //getting the checked checkboxes
    //selecting inputs
    let ai = document.querySelector("input[id='ai']");
    let hackathon = document.querySelector("input[id='hackathon']");
    let music = document.querySelector("input[id='music']");
    let sport = document.querySelector("input[id='sport']");
    // getting selected checkbox text
    let checkedBoxes = Array.from(checkBoxes).filter(box=> box.checked);
    let selectedClubs = [];

    if(ai.checked){
        let aiId = ai.id;
        let text = document.querySelector(`label[for='${aiId}']`).textContent;
        selectedClubs.push(text);
    }
    if(hackathon.checked){
        let hackathonId = hackathon.id;
        let text = document.querySelector(`label[for='${hackathonId}']`).textContent;
        selectedClubs.push(text);    }
     if(music.checked){
        let musicId = music.id;
        let text = document.querySelector(`label[for='${musicId}']`).textContent;
        selectedClubs.push(text);
    }
    if(sport.checked){
        let sportId = sport.id;
        let text = document.querySelector(`label[for='${sportId}']`).textContent;
        selectedClubs.push(text);
    }
    selectedClubs.join(", ");
    //removing the existing text

    let defaultPara  = document.querySelector(".list .centered-content p");
    defaultPara.textContent = "";
    //creating the table
    let enrolled = document.querySelector(".list .centered-content");
    let table = document.querySelector(".list .centered-content table");
    if(!table){
    table = document.createElement("table");
    let tableHeaders = ["Nom", "Prénom", "Email", "Genre", "Filière", "Groupe", "Clubs"];
    let row = document.createElement("tr");
    tableHeaders.forEach(heading => {let th = document.createElement("th");
        th.textContent = heading;
        row.appendChild(th);
        
    });
    table.appendChild(row);
    enrolled.appendChild(table);
}

    let dataRow = document.createElement("tr");
    let userData = [trimmedLast, trimmedFirst, trimmedEmail, getRadioText(), selectedFiliere,selectedGroup, selectedClubs];
    userData.forEach(data =>{ let td = document.createElement("td");
    td.textContent = data;
    dataRow.appendChild(td);

});
table.appendChild(dataRow);


let inscription = document.querySelector(".list #right");
inscription.textContent = "";
    count ++ ;
    if(count <= 1){
    inscription.textContent = count + " inscription";
    }
    else{
        inscription.textContent = count + " inscriptions";
    }
    //statistics 
    let inscriptionStatistics = document.querySelector(".statistics .text p");
    inscriptionStatistics.textContent = count;
    let genderStats = document.querySelector(".gender .text p");
    if(maleChoice.checked){
        maleCount++;
    }
    else{
        femaleCount++;
    }
    genderStats.textContent = `${maleCount} / ${femaleCount}`;
    //web and mobile stats
     let CountField = document.querySelector(".field .text p");
    if(filiere.value === "web"){
        webCount++;
    }
    else if(filiere.value === "mobile"){
        mobileCount++;
    }
   
    CountField.textContent = `${webCount} / ${mobileCount}`;
    submitForm.reset();
    selectGroup.disabled = true;

}

});

