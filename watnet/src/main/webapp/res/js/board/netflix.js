////////////////////netflix, watcha
var recVideoImg1Elem = document.querySelector('#recVideo_img1')
var recVideoImg2Elem = document.querySelector('#recVideo_img2')
var recVideoImg3Elem = document.querySelector('#recVideo_img3')
var recVideoImg4Elem = document.querySelector('#recVideo_img4')
var modalElem = document.querySelector('.recVideo_modal')
var iframeElem = modalElem.querySelector('#recVideo_iframe')
var mdCloseElem = modalElem.querySelector('#recVideo_md_close')

const rec1NetflixUrl = 'https://www.youtube.com/embed/V7WE7Fee6z8'
const rec2NetflixUrl = 'https://www.youtube.com/embed/N2Evva6aLC8'
const rec3NetflixUrl = 'https://www.youtube.com/embed/yXwC5Oe_5Ok'
const rec4NetflixUrl = 'https://www.youtube.com/embed/ITH6ttdXBqk'

function openModal(){
	modalElem.classList.remove('hidden')
}

function closeModal(){
	modalElem.classList.add('hidden')
}

recVideoImg1Elem.addEventListener('click', function(){
	iframeElem.setAttribute('src', rec1NetflixUrl)
	openModal()
})

recVideoImg2Elem.addEventListener('click', function(){
	iframeElem.setAttribute('src', rec2NetflixUrl)
	openModal()
})

recVideoImg3Elem.addEventListener('click', function(){
	iframeElem.setAttribute('src', rec3NetflixUrl)
	openModal()
})

recVideoImg4Elem.addEventListener('click', function(){
	iframeElem.setAttribute('src', rec4NetflixUrl)
	openModal()
})

mdCloseElem.addEventListener('click', function() {
	iframeElem.setAttribute('src', "")
	closeModal()
})








