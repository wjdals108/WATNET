<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<input id="hiddenUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">
<div class="pointHistory-container">
	<div class="pointHistoryBtn-container">
		<button id="payHistoryBtn" type="button">결제 내역</button>
		<button id="chargeHistoryBtn" type="button">충전 내역</button>
	</div>
	<div class="pointHistory-content">
	
	</div>
	<div class="pointHistory-result">
	
	</div>
</div>