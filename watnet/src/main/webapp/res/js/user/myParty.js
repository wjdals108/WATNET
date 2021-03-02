var myPartyElem = document.querySelector('.myParty-container')
var myPartyInfoElem = document.querySelector('.myParty-info')
var myPartySpanElem = document.querySelector('.myParty-title-span')
var myPartyUserElem = document.querySelector('.myParty-user-container')
var myPartyBtnElem = document.querySelector('.myParty-btn-container')

var shareInfoModalElem = document.querySelector('#shareInfoModal')

var hiddenUserPkElem = document.querySelector('#hiddenUserPk')

if(hiddenUserPkElem.value === '') {
	myPartySpanElem.innerHTML = 
	`
	<span class="myParty-info-span">
	로그인 되어 있지 않습니다!<br>
	지금 바로 WATNET을 이용해보세요 
	</span>
	`
}

selMyParty()

function selMyParty() {
	fetch(`/boardAjax/selMyParty?userPk=${hiddenUserPkElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		makeMyParty(myJson)
		selUserProfile(myJson)
	})
	
	
	function selUserProfile(item) {
		fetch(`/boardAjax/selUserProfile?boardPk=${item.boardPk}`)
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
		userContainerElem.classList.add('myParty-user')
		userContainerElem.innerHTML = 
		`
		<img src="/res/img/user/${myJson.userPk}/${myJson.profileImg}" alt="profile image" onerror="this.src='/res/img/profileImg.png'">
	    <span>${myJson.nickname}</span>
		`
		myPartyUserElem.append(userContainerElem)
	}

	function makeNoneUser() {
		var userContainerElem = document.createElement('div')
		userContainerElem.classList.add('myParty-user')
		userContainerElem.innerHTML = 
		`
		<img src="/res/img/default-profileImg.png" alt="profile image">
	    <span>모집대기중</span>
		`
		myPartyUserElem.append(userContainerElem)
	}
}



function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function makeMyParty(item) {
	myPartySpanElem.innerHTML = 
	`
	<span class="myParty-category">${item.nm} 프리미엄 파티</span>
    <span class="myParty-info-span">
       	시작 날짜 : ${item.startDt} <br>
		종료 날짜 : ${item.endDt} <br>
		총 비용 : ${numberWithCommas(item.price)} 원
    </span>
	`
	
	myPartyBtnElem.innerHTML = 
	`
	<button id="chkShareInfo" type="button">공유 ID/PW 확인</button>
    <div class="myParty-btn">
        <button id="openPostBtn" type="button">쪽지보내기</button>
        <button id="quitPartyBtn" type="button">파티 탈퇴</button>
    </div>
	`
}