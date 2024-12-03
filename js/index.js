var mainBtn = document.getElementById("mainBtn");
var userInput = document.getElementById("userInput");
var userSearch = document.getElementById("userSearch");
var validationAlert = document.getElementById("validationAlert")

var notes;

if( localStorage.getItem("notes") != null ){
    //there is data

    notes = JSON.parse(localStorage.getItem("notes"))
    displayNote(notes)
    console.log(notes);
}else {
    //there is no data
    notes = []
}

function addNote() {

    if(mainBtn.innerHTML == "Submit"){
        // Submit ==> addnote

        notes.push(userInput.value)
        console.log(notes);
    }else {
        // Update ==> update Note

        notes.splice(  updatedIndex  ,    1     ,  userInput.value  )
        console.log(notes);
        mainBtn.innerHTML= "Submit"
    }

    localStorage.setItem(  "notes" ,  JSON.stringify(notes) )
    displayNote(notes)
    clear()

}


function displayNote(anyArray){
    var box ="";

    for(    var i = 0       ;   i <    anyArray.length        ;     i++     ) {
        box += `
                    <div class="home-item mb-2 px-3  text-dark mx-auto w-25 bg-white d-flex justify-content-between align-items-center">
            <p id="x">${anyArray[i]}</p>
            <div class=" w-25 d-flex justify-content-between align-items-center">
                <i class=" fa-sharp fa-solid fa-trash" onclick="deleteRow(${ i })"></i>
                <i class="fa-solid fa-pen-to-square" onclick="updateRow(${ i })"></i>
            </div>
        </div>
        `
    }


    document.getElementById("home").innerHTML = box
}


function deleteRow (index){
    notes.splice(  index  ,  1  )
    displayNote(notes)
    localStorage.setItem(  "notes" ,  JSON.stringify(notes) )
    console.log(notes);
    
}

var updatedIndex = 0

function updateRow(index){
    userInput.value = notes[index];
    mainBtn.innerHTML = "Update"

    updatedIndex = index
}


function clear() {
    userInput.value = ""
}


userSearch.addEventListener(  "keyup"   ,   function (e) {
    console.log("Afshdkfgs".toLowerCase());
    console.log(e.target.value);
    
    
    var wantedSearch = []
    for (var i = 0   ;  i < notes.length    ;   i++  ) {
        if( notes[i].toLowerCase().includes(e.target.value.toLowerCase()) ) {
            wantedSearch.push(notes[i])
            console.log(wantedSearch);
            
        }
    }

    displayNote(wantedSearch)
}  )



var notesRegex = /^[A-Za-z1-9]{3,}$/


function isNoteValid(){    // 1st step (setup regex)
    if(notesRegex.test(userInput.value)){
        return true
    }else{
        return false
    }
}


userInput.addEventListener(  "keyup"   ,  function (){  //2nd step (use regex)
    if(isNoteValid()){
        //valid 
        console.log("validdd");
        
        userInput.classList.add("is-valid")
        userInput.classList.remove("is-invalid")

        mainBtn.removeAttribute("disabled")

        validationAlert.classList.add("d-none")
    }else {
        //invalid
        console.log("invaliddd");

        userInput.classList.add("is-invalid")
        userInput.classList.remove("is-valid")

        mainBtn.setAttribute("disabled" , "")

        validationAlert.classList.remove("d-none")
    }

}  )
