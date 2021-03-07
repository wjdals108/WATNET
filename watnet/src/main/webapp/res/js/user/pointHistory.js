var hiddenUserPkElem = document.querySelector('#hiddenUserPk')

var payHistoryBtn = document.querySelector('#payHistoryBtn')
var chargeHistoryBtn = document.querySelector('#chargeHistoryBtn')

var pointHistoryElem = document.querySelector('.pointHistory-content')
var pointHistoryResultElem = document.querySelector('.pointHistory-result')

function numberWithCommas(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function clearView() {
	pointHistoryElem.innerHTML = ''
}

function createTable(str) {
	var tableElem = document.createElement('table')
	tableElem.classList.add('pointHistory-table')
	tableElem.innerHTML = 
	`
	<tr>
		<th class="th-nickname">Nickname</th>
		<th class="th-historyNm">${str}</th>
		<th class="th-regDt">날짜</th>
	</tr>
	`
	return tableElem
}

function createRecord(item) {
	var tr = document.createElement('tr')
	tr.innerHTML = 
	`
	<td>${item.nickname}</td>
	<td>${item.point}</td>
	<td>${item.regDt}</td>
	`
	return tr
}

function makePayHistoryTable(myJson) {
	if(myJson.length === 0) {
		return
	}
	var tableElem = createTable('결제금액')
	let sum = 0
	myJson.forEach(function(item) {
		tableElem.append(createRecord(item))
		sum += item.point
	})
	pointHistoryElem.append(tableElem)
	pointHistoryResultElem.innerHTML = 
	`
	<span>총 결제 금액은 <span class="redSpan">${numberWithCommas(sum)}</span> 원 입니다.</span>
	`
}

function makeChargeHistoryTable(myJson) {
	if(myJson.length === 0) {
		return
	}
	var tableElem = createTable('충전금액')
	let sum = 0
	myJson.forEach(function(item) {
		tableElem.append(createRecord(item))
		sum += item.point
	})
	pointHistoryElem.append(tableElem)
	pointHistoryResultElem.innerHTML = 
	`
	<span>총 충전 금액은 <span class="redSpan">${numberWithCommas(sum)}</span> 원 입니다.</span>
	`
}



function selMinusPointHistory() {
	fetch(`/userAjax/selMinusPointHistory?userPk=${hiddenUserPkElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		clearView()
		makePayHistoryTable(myJson)
	})
}
payHistoryBtn.addEventListener('click', selMinusPointHistory)

function selPlusPointHistory() {
	fetch(`/userAjax/selPlusPointHistory?userPk=${hiddenUserPkElem.value}`)
	.then(function(res) {
		return res.json()
	}).then(function(myJson) {
		clearView()
		makeChargeHistoryTable(myJson)
	})
}
chargeHistoryBtn.addEventListener('click', selPlusPointHistory)
