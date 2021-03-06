var hiddenUserPkElem = document.querySelector('#hiddenUserPk')
var hiddenUserIdElem = document.querySelector('#hiddenUserId')

var plusPointInputElem = document.querySelector('#plusPoint-input')
var plusPointSubBtn = document.querySelector('#plusPointSubBtn')

function plusPoint() {
	
	if(plusPointInputElem.value === '') {
		alert('충전하실 POINT를 입력하세요')
		return
	}
	
	var param = {
		userPk: hiddenUserPkElem.value,
		userId: hiddenUserIdElem.value,
		modPoint: plusPointInputElem.value,
	}
	
	fetch(`/userAjax`, {
		method: 'put',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(param)
	}).then(function(res) {
		return res.json()
	}).then(function(myJson) {
		if(myJson == 1) {
			alert('POINT 충전 성공')
			location.href = "/index"
			return
		} else {
			alert('실패')
			return
		}
	})
}
plusPointSubBtn.addEventListener('click', plusPoint)