<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="makeParty-container">
	<div class="makeParty-header">
		<h1>파티 등록</h1>
		<hr>
	</div>
	<input id="makeParty-category-hidden" type="hidden" value="${param.category}">
	<input id="loginUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">
	<ul class="makeParty-list">
		<li><span class="makeParty-list-span">서비스</span>
		<select	id="service-select">
			<c:if test="${param.category == 1}">
				<option id="option1" value="1" selected>넷플릭스</option>
				<option id="option2" value="2">왓챠</option>
			</c:if>
			<c:if test="${param.category == 2}">
				<option id="option1" value="1">넷플릭스</option>
				<option id="option2" value="2" selected>왓챠</option>
			</c:if>
		</select>
		</li>
		<li><span class="makeParty-list-span">제목</span> <input
			id="makeParty-title-input" class="makeParty-input" type="text"
			placeholder="제목을 입력해 주세요"></li>
		<li><span class="makeParty-list-span">공유할 계정</span>
			<div class="share-info">
				<input id="makeParty-shareId" class="makeParty-input width-200"
					type="text" placeholder="계정 아이디(이메일)"> <input
					id="makeParty-sharePw" class="makeParty-input width-200"
					type="password" placeholder="패스워드">
			</div></li>
		<li><span class="makeParty-list-span">연락처(문의처)</span> <input
			id="makeParty-leaderPNum" class="makeParty-input width-200"
			type="text" value="${sessionScope.loginUser.pNum}" readonly></li>
		<li><span class="makeParty-list-span">진행기간</span>
			<div class="progress-period">
				<div class="start-date">
					<span>시작날짜 : </span> <input id="makeParty-startDt"
						class="makeParty-input" type="date">
				</div>
				<div class="progress-date">
					<input id="progress-mon-input" class="makeParty-input" type="text">
					<span>달 동안 진행가능</span>
					<button id="chkEndDtBtn" type="button">종료일 확인</button>
					<input id="chkEndDtChkbox" class="hidden" type="checkbox">
					<span id="end-date" class="redColor"></span>
				</div>
			</div></li>
		<li><span class="makeParty-list-span">참여 금액(1인)</span> <span
			id="makePartyPrice" class="redColor"></span></li>
		<li><span class="makeParty-list-span">상세 내용 입력</span> <textarea
				id="makeParty-detail-rule"></textarea></li>
	</ul>
	<div class="makeParty-btn-container">
		<a href="/board/netflix">
			<button id="makeParty-cancleBtn" type="button">취소</button>
		</a>
		<button id="makeParty-submitBtn" type="button">등록</button>
	</div>

</div>