/************** DOM variables ************/

const inputElems = document.querySelectorAll('.input'); //array-like object med alla inputs.
const submitBtn = document.querySelector('.btn');
const loader = document.querySelector('.loading-container');


/***** disable button and hide loader: */

disableBtn(true); 
loader.style.display = 'none';


/************Event listeners******* */

submitBtn.addEventListener('click', loadCard);
for(let i=0; i<inputElems.length; i++){
    inputElems[i].addEventListener('focus', function(e){
        e.target.classList.add('focus');
    });
    inputElems[i].addEventListener('blur', checkInput); 
} 


/******************** Functions****************** */

// check input fields and add classes to style them accordingly
function checkInput(e){
    if(e.target.classList.contains('focus')){
        e.target.classList.remove('focus');
    }
    if(e.target.value == ''){
        if(e.target.classList.contains('correct')){
            e.target.classList.remove('correct');
        }
        e.target.classList.add('alert');
    } else {
        if(e.target.classList.contains('alert')){
            e.target.classList.remove('alert');
        }
        e.target.classList.add('correct');
    }
    if(inputElems[0].value != '' && inputElems[1].value != '' && inputElems[2].value != ''){
        disableBtn(false);
    } else { 
        disableBtn(true);
    }
}

// Enable/disable submit-button */
function disableBtn(isTrue){
    if(isTrue){
        submitBtn.disabled = true;
    } else {
        submitBtn.disabled = false;
    }
}

//show loader for 2s, then call createCard()
function loadCard(e){
    e.preventDefault();
    loader.style.display = 'flex';
    setTimeout(createCard, 2000);
}

function createCard(){
    loader.style.display = 'none'; //hide loader again

    const cardContainer = document.querySelector('.card-container');
    let name = document.querySelector('.name-input');
    let course = document.querySelector('.course-input');
    let author = document.querySelector('.author-input'); 

    
    let randomNr = Math.floor(Math.random() * 8); /* get int 0-7 (8 is excluded) */

    const code = `    
        <div class="card">
            <div class="card-img">
                <img src="img/img-${randomNr}.jpg">
            </div>
            <div class="card-body">
                <p><span class="badge name-badge">Name:</span><span class="text"> ${name.value}</span></p>
                <p><span class="badge course-badge">Course:</span><span class="text"> ${course.value}</span></p>
                <p><span class="badge author-badge">Author:</span><span class="text"> ${author.value}</span></p>
                </div>
        </div> `;

    cardContainer.innerHTML += code;

    for(let i=0; i < inputElems.length; i++){
        inputElems[i].classList.remove('correct');
        inputElems[i].value = '';
    }
}

