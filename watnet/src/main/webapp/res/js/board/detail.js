var detailMainElem = document.querySelector('.detail-main-container')
var detailHeaderElem = document.querySelector('.detail-header')
var detailTitleElem = document.querySelector('.detail-title-container')
var detailLeaderElem = document.querySelector('.detail-leader-container')
var detailStartDtElem = document.querySelector('.detail-startDt')
var detailEndDtElem = document.querySelector('.detail-endDt')
var detailUserElem = document.querySelector('.detail-user-table')
var detailTextElem = document.querySelector('.detail-text')

var hiddenBoardPkElem = document.querySelector('#hiddenBoardPk')
var hiddenUserPkElem = document.querySelector('#loginUserPk')

var detailCancleBtn = document.querySelector('#detail-cancleBtn')
var detailSubBtnElem = document.querySelector('#detail-submitBtn')

selBoard()
selUserProfile()

function selBoard() {
	fetch(`/boardAjax/selBoard?boardPk=${hiddenBoardPkElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		makeDetail(myJson)
	})
}

function selUserProfile() {
	fetch(`/boardAjax/selUserProfile?boardPk=${hiddenBoardPkElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		myJson.forEach(function(item) {
			makeUser(item)
		})
		for(var i=1; i<=(4-myJson.length); i++) {
			makeNoneUser()
		}
	})
}

function makeUser(myJson) {
	var userContainerElem = document.createElement('div')
	userContainerElem.classList.add('user-container')
	userContainerElem.innerHTML = 
	`
	<img src="/res/img/user/${myJson.userPk}/${myJson.profileImg}" alt="profile image" onerror="this.src='/res/img/profileImg.png'">
    <span>${myJson.nickname}</span>
	`
	detailUserElem.append(userContainerElem)
}

function makeNoneUser() {
	var userContainerElem = document.createElement('div')
	userContainerElem.classList.add('user-container')
	userContainerElem.innerHTML = 
	`
	<img src="/res/img/default-profileImg.png" alt="profile image">
    <span>모집대기중</span>
	`
	detailUserElem.append(userContainerElem)
}

function makeDetail(item) {
	
	if(item.category == 1){
		
		detailHeaderElem.innerHTML =
		`
		<h2>NETFLIX</h2>
        <button id="makePartyBtn" type="button">파티 만들기</button>
		`
		
		detailTitleElem.innerHTML = 
		`
		<img class="detail-title-img" src="/res/img/detail-netflix.jpg" alt="netflix logo">
        <div class="detail-title-span">
            <span class="detail-title-categoryNm">넷플릭스 프리미엄</span>
            <span class="detail-title">${item.title}</span>
        </div>
		`
	}  else if(item.category == 2) {
		
		detailHeaderElem.innerHTML =
		`
		<h2>WATCHA</h2>
        <button id="makePartyBtn" type="button">파티 만들기</button>
		`
		
		detailTitleElem.innerHTML = 
		`
		<img class="detail-title-img" src="/res/img/detail-watcha.jpg" alt="netflix logo">
        <div class="detail-title-span">
            <span class="detail-title-categoryNm">왓챠 프리미엄</span>
            <span class="detail-title">${item.title}</span>
        </div>
		`
	}
	
	detailLeaderElem.innerHTML = 
	`
	<div class="leader-info">
        <img class="leader-profileImg" src="/res/img/profileImg.png" alt="leader-profile image">
        <span>리더닉네임</span>
    </div>
    <span>파티 번호 : ${item.boardPk}</span>
	`
	
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
	
	let startDt = new Date(item.startDt)
	let endDt = new Date(item.endDt)
	
	let now = new Date()
	let nowDtString = getStringDay(now)
	let nowDt = new Date(nowDtString)

	let leftStartDays = Math.ceil((startDt.getTime()-nowDt.getTime())/(1000*3600*24))
	let leftLastDays = Math.ceil((endDt.getTime()-startDt.getTime())/(1000*3600*24))
	
	
	detailStartDtElem.innerHTML = 
	`
	<span id="startDt-span">시작일 : ${item.startDt} (${leftStartDays})일</span>
	`
	
	detailEndDtElem.innerHTML = 
	`
	<span id="endDt-span">종료일 : ${item.endDt} (${leftLastDays})일</span>
    <span>참여 비용 : <span class="redSpan"> ${numberWithCommas(item.price)}</span> 원</span>
	`
	
	detailTextElem.innerHTML = 
	`
	<p id="detail-ctnt">
        ${item.ctnt}
    </p>
	<div class="detail-checkbox">
        <input id="detail-checkbox" type="checkbox">
        <span>파티에 대한 안내 및 규칙을 확인하였습니다.</span>
    </div>
	`
	var detailChkBoxElem = document.querySelector('#detail-checkbox')
	
	function joinParty() {
		if(!detailChkBoxElem.checked) {
			alert('파티에 대한 안내 및 규칙을 확인하여 주세요.')
			detailChkBoxElem.focus()
			return
		}
		
		if(hiddenUserPkElem.value == '') {
			alert('로그인을 하셔야 파티 참여 신청이 가능합니다.')
			location.href="/user/login"
			return
		}
		
		if(confirm(`정말 참여신청을 하시겠습니까?\n보유하고 계신 Point에서 ${numberWithCommas(item.price)}원 만큼 차감됩니다.`) == true) {
			var param = {
				boardPk : hiddenBoardPkElem.value,
				userPk : hiddenUserPkElem.value,
			}
			
			fetch(`/boardAjax/joinParty`, {
				method: 'post',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(param)
			}).then(function(res) {
				return res.json()
			}).then(function(myJson) {
				if(myJson == -1) {
					alert('이미 다른 파티에 가입되어있습니다.')
					//location.href = `/user/myParty`
					return
				} else {
					alert('파티 참여 신청 완료')
					//location.href = '/user/myParty'
					return
				}
			})
		} else {
			return
		}
	}
	detailSubBtnElem.addEventListener('click', joinParty)

	var makePartyElem = document.querySelector('#makePartyBtn')
	var loginUserElem = document.querySelector('#loginUserPNum')
	if(makePartyElem) {
		function makeParty() {
			if(loginUserElem.value == null || loginUserElem.value === '') {
				alert('고객님의 프로필에 휴대폰 정보가 없습니다. 휴대폰 번호를 등록해주세요.')
				//location.href = '프로필 편집'
				return;
			}
			location.href = '/board/makeParty?category=1'
		}
	
		makePartyElem.addEventListener('click', makeParty)
	}
}

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

