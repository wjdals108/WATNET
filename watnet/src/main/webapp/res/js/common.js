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

var changeImgElem = document.querySelector('.change-img')

if(changeImgElem) {
	var imgArray = new Array()
	imgArray[0] = '/res/img/board-capture.jpg'
	imgArray[1] = '/res/img/content-capture.jpg'
	imgArray[2] = '/res/img/myparty-capture.jpg'
	imgArray[3] = '/res/img/shareinfo-capture.jpg'
	imgArray[4] = '/res/img/post-capture.jpg'
	
	var imgArrayIdx = 0
	
	function showImg() {
		changeImgElem.src = imgArray[imgArrayIdx]
		imgArrayIdx++
		if(imgArrayIdx >= imgArray.length) {
			imgArrayIdx = 0
		}
	}
	setInterval(showImg, 4000)
}