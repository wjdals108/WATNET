function isEmail(asValue) {
	var regExp = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
	return regExp.test(asValue); // 형식에 맞는 경우 true 리턴	
}

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

///////////////////////////makeParty
var categorySelElem = document.querySelector('#service-select')
var makePartyTitleElem = document.querySelector('#makeParty-title-input')
var makePartyShareIdElem = document.querySelector('#makeParty-shareId')
var makePartySharePwElem = document.querySelector('#makeParty-sharePw')
var makePartyPNumElem = document.querySelector('#makeParty-leaderPNum')
var makePartyStartDtElem = document.querySelector('#makeParty-startDt')
var makePartyProgressMonElem = document.querySelector('#progress-mon-input')
var chkEndDtBtnElem = document.querySelector('#chkEndDtBtn')
var chkEndDtChkboxElem = document.querySelector('#chkEndDtChkbox')
var makePartyEndDtElem = document.querySelector('#end-date')
var makePartyPriceElem = document.querySelector('#makePartyPrice')
var makePartyCtntElem = document.querySelector('#makeParty-detail-rule')

var makePartySubElem = document.querySelector('#makeParty-submitBtn')

////////////////카테고리에 맞춰서 selected
var hiddenCategoryElem = document.querySelector('#makeParty-category-hidden')
var hiddenUserPkElem = document.querySelector('#loginUserPk')
var option1Elem = categorySelElem.querySelector('#option1')
var option2Elem = categorySelElem.querySelector('#option2')

if(hiddenCategoryElem.value == 1) {
	option1Elem.selected = true	
} else {
	option2Elem.selected = true
}

//////////makeParty
if(makePartySubElem) {
	const netflixPrice = 14500
	const watchaPrice = 12900
	
	var date = new Date()
	var today = getStringDay(date)
	makePartyStartDtElem.value = today
	
	function chkEndDt() {
		if(makePartyProgressMonElem.value === '') {
			alert('몇 달 동안 진행하실 건지 입력해주세요.')
			makePartyProgressMonElem.focus()
			return
		}
		
		var progressMon = parseInt(makePartyProgressMonElem.value)
		
		var strArr = makePartyStartDtElem.value.split('-')
		var makePartyStartDt = new Date(strArr[0], strArr[1]-1, strArr[2])
		
		makePartyStartDt.setMonth(makePartyStartDt.getMonth() + progressMon)
		var endDt = getStringDay(makePartyStartDt)
		if(hiddenCategoryElem.value == 1){
			partyPrice = netflixPrice * progressMon / 4 			
		} else if(hiddenCategoryElem.value == 2) {
			partyPrice = watchaPrice * progressMon / 4
		}
		
		makePartyEndDtElem.innerText = endDt
		makePartyPriceElem.innerText = numberWithCommas(partyPrice) + ' 원'
		
		chkEndDtChkboxElem.checked = true
	}
	
	chkEndDtBtnElem.addEventListener('click', chkEndDt)
	
	function numberWithCommas(num) {
	    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	function makeParty() {
		if(categorySelElem.value === '') {
			alert('서비스를 선택하지 않으셨습니다.')
			categorySelElem.focus()
			return
		} else if(makePartyTitleElem.value === '') {
			alert('제목을 입력하지 않으셨습니다.')
			makePartyTitleElem.focus()
			return
		} else if(makePartyShareIdElem.value === '') {
			alert('공유할 계정 ID를 입력하지 않으셨습니다.')
			makePartyShareIdElem.focus()
			return
		} else if(!isEmail(makePartyShareIdElem.value)) {
			alert('이메일을 양식에 맞게 작성해주세요')
			userEmailElem.focus()
			return
		} else if(makePartySharePwElem.value === '') {
			alert('공유할 계정 PW를 입력하지 않으셨습니다.')
			makePartySharePwElem.focus()
			return
		} else if(makePartyStartDtElem.value === '') {
			alert('시작날짜를 입력하지 않으셨습니다.')
			makePartyStartDtElem.focus()
			return
		} else if(!chkEndDtChkboxElem.checked) {
			alert('종료일 확인을 하시지 않으셨습니다.')
			makePartyProgressMonElem.focus()
			return
		} else if(makePartyCtntElem.value === '') {
			alert('상세 내용을 입력하지 않으셨습니다.')
			makePartyCtntElem.focus()
			return
		}
		
		var progressMon = parseInt(makePartyProgressMonElem.value)
		
		var strArr = makePartyStartDtElem.value.split('-')
		var makePartyStartDt = new Date(strArr[0], strArr[1]-1, strArr[2])
		
		makePartyStartDt.setMonth(makePartyStartDt.getMonth() + progressMon)
		var endDt = getStringDay(makePartyStartDt)
		var partyPrice = netflixPrice * progressMon / 4
		
		var param = {
			category: categorySelElem.value,
			title: makePartyTitleElem.value,
			shareId: makePartyShareIdElem.value,
			sharePw: makePartySharePwElem.value,
			leaderPk: hiddenUserPkElem.value,
			leaderpNum: makePartyPNumElem.value,
			startDt: makePartyStartDtElem.value,
			endDt: endDt,
			price: partyPrice,
			ctnt: makePartyCtntElem.value,
			userPk: hiddenUserPkElem.value,
		}
		
		fetch(`/boardAjax`, {
			method: 'post',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(param)
		}).then(function(res) {
			return res.json()
		}).then(function(myJson) {
			if(myJson === 1) {
				alert('글 등록 완료')
				location.href = "/board/netflix"
				return
			} else if(myJson === -1) {
				alert('이미 등록 된 파티가 있습니다.')
				return
			} else if(myJson === 2) {
				alert('글 등록 완료')
				location.href = "/board/watcha"
				return
			} else {
				alert('실패')
				return
			}
		})
	}
	makePartySubElem.addEventListener('click', makeParty)
}