<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<div class="detail-main-container">
	
	<input id="hiddenBoardPk" type="hidden" value="${param.boardPk}">
   	<input id="loginUserPNum" type="hidden" value="${sessionScope.loginUser.pNum}">
	<input id="loginUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">
	<input id="lgoinUserPoint" type="hidden" value="${sessionScope.loginUser.userPoint}">
	
	<div class="detail-header">
    </div>
    <div class="detail-title-container">
    </div>
    <div class="detail-leader-container">
    </div>
    <div class="detail-startDt">
    </div>
    <div class="detail-endDt">
    </div>
    <div class="detail-user-table">
    </div>
    <div class="detail-text">
    </div>
    <div class="detail-btn-container">
        <button id="detail-cancleBtn" type="button">목록</button>
        <c:choose>
        	<c:when test="${sessionScope.loginUser.userPk == leaderPk}">
        		<button id="detail-deleteBtn" type="button">삭제</button>
        	</c:when>
        	<c:otherwise>
        		<button id="detail-submitBtn" type="button">참여신청</button>	
        	</c:otherwise>
        </c:choose>
    </div>
</div>