var netflixBtnElem = document.querySelector("#netflixBtn")
var watchaBtnElem = document.querySelector("#watchaBtn")
var conListElem = document.querySelector("#conList")
var currentPageElem = document.querySelector("#currentPage")
var conSelElem = null;
if(netflixBtnElem) {
	netflixBtnElem.addEventListener('click', function() {
		conSelElem = "netflix"
		conListElem.innerHTML = ''
		temp(1)
		temp(2)
	})
}

if(watchaBtnElem) {
	watchaBtnElem.addEventListener('click', function() {
		conSelElem = "watcha"
		conListElem.innerHTML = ''
		temp(1)
		temp(2)
	})
}

function conList(item) {
	var img = document.createElement('div')
	img.classList.add('contents-img')
	img.innerHTML = `<a href=${item.hrefSrc} target="_blank"><img id="contents-imgfile" src="${item.imgSrc}"></a>`
	conListElem.append(img)
}

function temp(nextPage) {
	fetch(`/boardAjax/contents?category=${conSelElem}&page=${nextPage}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		myJson.forEach(function (item) {
			conList(item)
		})
	})
}

function getDocumentHeight() {
    const body = document.body;
    const html = document.documentElement;
    
    return Math.max(
        body.scrollHeight, body.offsetHeight,
        html.clientHeight, html.scrollHeight, html.offsetHeight
    )
}


function getScrollTop() {
    return (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop
}

window.onscroll = function() {
    if (getScrollTop() < getDocumentHeight() - window.innerHeight) {
		return;
	}
	let nextPage = parseInt(currentPageElem.value) + 1
	currentPageElem.value = nextPage
	
	setTimeout(temp(nextPage), 500)
}