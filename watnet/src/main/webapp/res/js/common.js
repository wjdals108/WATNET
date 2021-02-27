var upElem = document.querySelector('#up')
if(upElem){
	upElem.addEventListener('click', up)
}

function up(){
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
    })
}