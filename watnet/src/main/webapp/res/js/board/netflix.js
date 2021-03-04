////////////////////netflix, watcha
var recVideoImg1Elem = document.querySelector('#recVideo_img1')
var recVideoImg2Elem = document.querySelector('#recVideo_img2')
var recVideoImg3Elem = document.querySelector('#recVideo_img3')
var recVideoImg4Elem = document.querySelector('#recVideo_img4')
var modalElem = document.querySelector('.recVideo_modal')
var iframeElem = modalElem.querySelector('#recVideo_iframe')
var mdCloseElem = modalElem.querySelector('#recVideo_md_close')

const rec1NetflixUrl = 'https://www.youtube.com/embed/UYlK5_lXrzA'
const rec2NetflixUrl = 'https://www.youtube.com/embed/KGAWN7zG83c'
const rec3NetflixUrl = 'https://www.youtube.com/embed/nRQoQsL9UXs'
const rec4NetflixUrl = 'https://www.youtube.com/embed/W6v1yM_c1Fg'

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

function getStringDay(date) {
	let year = date.getFullYear() // 년도
	let month = "" + (date.getMonth() + 1)  // 월
	if(month.length < 2) {
		month = "0" + month
	}
	let day = "" + date.getDate()  // 날짜
	if(day.length < 2) {
		day = "0" + day
	}
	
	let StringDay = year + '-' + month + '-' + day
	
	return StringDay
}

var makePartyElem = document.querySelector('#makePartyBtn')
var loginUserElem = document.querySelector('#loginUserPNum')
var hiddenUserPkElem = document.querySelector('#hiddenUserPk')
var hiddenUserCategoryElem = document.querySelector('#hiddenUserCategory')

if(makePartyElem) {
	function makeParty() {
		if(hiddenUserPkElem.value == null || hiddenUserPkElem.value === '') {
			alert('로그인 후 이용해 주세요')
			location.href = 'user/login'
			return
		}
		else if(loginUserElem.value == null || loginUserElem.value === '') {
			alert('고객님의 프로필에 휴대폰 정보가 없습니다. 휴대폰 번호를 등록해주세요.')
			location.href = `/user/editProfileChkPw?userPk=${hiddenUserPkElem.value}`
			return
		}
		location.href = '/board/makeParty?category=1'
	}
	
	makePartyElem.addEventListener('click', makeParty)
}


var boardElem = document.querySelector('.board-container')
var currentPageElem = document.querySelector('#currentPage')
var maxPageElem = document.querySelector('#maxPage')
var moreSelectElem = document.querySelector('#moreSelect')

selBoardList()

function selBoardList() {
	
	fetch(`/boardAjax?category=1&page=${currentPageElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		myJson.forEach(function (item) {
			makeArticle(item)
		})
	})
}

function makeArticle(item) {
	let startDt = new Date(item.startDt)
	let endDt = new Date(item.endDt)
	
	let now = new Date()
	let nowDtString = getStringDay(now)
	let nowDt = new Date(nowDtString)

	let leftStartDays = Math.ceil((startDt.getTime()-nowDt.getTime())/(1000*3600*24))
	let leftLastDays = Math.ceil((endDt.getTime()-startDt.getTime())/(1000*3600*24))
	
	var div = document.createElement('div')
	
	if(item.recruitNum == 2) {
		div.innerHTML =
		`
		<a href='/board/detail?boardPk=${item.boardPk}'>
		<article class="board-article">
		<h2 class="article-h2">넷플릭스 프리미엄</h2>
		<span class="party-name">${item.title}</span>
		<div class="article-img">
			<img class="user1-profileImg" src="/res/img/profileImg.png" alt="profile image">
			<img class="user2-profileImg" src="/res/img/profileImg.png" alt="profile image">
			<img class="user3-profileImg" src="/res/img/default-profileImg.png"	alt="profile image">
			<img class="user4-profileImg" src="/res/img/default-profileImg.png" alt="profile image">
		</div>
		<div class="article-footer">
			<div class="party-date">
				<span>${item.startDt}부터 (${leftStartDays}일)</span> <span>${item.endDt}까지 (${leftLastDays}일)</span>
			</div>
			<span class="pay-point"><span class="price">${item.price}</span>원</span>
		</div>
		</article>
		</a>
		`
	} else if(item.recruitNum == 3) {
		div.innerHTML =
		`
		<a href='/board/detail?boardPk=${item.boardPk}'>
		<article class="board-article">
		<h2 class="article-h2">넷플릭스 프리미엄</h2>
		<span class="party-name">${item.title}</span>
		<div class="article-img">
			<img class="user1-profileImg" src="/res/img/profileImg.png" alt="profile image">
			<img class="user2-profileImg" src="/res/img/profileImg.png" alt="profile image">
			<img class="user3-profileImg" src="/res/img/profileImg.png"	alt="profile image">
			<img class="user4-profileImg" src="/res/img/default-profileImg.png" alt="profile image">
		</div>
		<div class="article-footer">
			<div class="party-date">
				<span>${item.startDt}부터 (${leftStartDays}일)</span> <span>${item.endDt}까지 (${leftLastDays}일)</span>
			</div>
			<span class="pay-point"><span class="price">${item.price}</span>원</span>
		</div>
		</article>
		</a>
		`
	} else {
		div.innerHTML =
		`
		<a href='/board/detail?boardPk=${item.boardPk}'>
		<article class="board-article">
		<h2 class="article-h2">넷플릭스 프리미엄</h2>
		<span class="party-name">${item.title}</span>
		<div class="article-img">
			<img class="user1-profileImg" src="/res/img/profileImg.png" alt="profile image">
			<img class="user2-profileImg" src="/res/img/default-profileImg.png" alt="profile image">
			<img class="user3-profileImg" src="/res/img/default-profileImg.png"	alt="profile image">
			<img class="user4-profileImg" src="/res/img/default-profileImg.png" alt="profile image">
		</div>
		<div class="article-footer">
			<div class="party-date">
				<span>${item.startDt}부터 (${leftStartDays}일)</span> <span>${item.endDt}까지 (${leftLastDays}일)</span>
			</div>
			<span class="pay-point"><span class="price">${item.price}</span>원</span>
		</div>
		</article>
		</a>
		` 
	}
	
	boardElem.append(div)
}

//인피니티 스크롤 구현
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
	
	setTimeout(selBoardList, 500)
}

/*
function moreSelect() {
	let nextPage = parseInt(currentPageElem.value) + 1
	currentPageElem.value = nextPage
	
	selBoardList()
}

moreSelectElem.addEventListener('click', moreSelect)
*/
	
	





