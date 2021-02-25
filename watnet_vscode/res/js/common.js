var upElem = document.querySelector('#up')

upElem.addEventListener('click', function(){
    window.scroll({
        behavior: 'smooth',
        left: 0,
        top: 0
    })
})