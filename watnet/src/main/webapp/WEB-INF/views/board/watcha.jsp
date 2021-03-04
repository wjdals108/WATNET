<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>

<input id="hiddenUserPk" type="hidden" value="${sessionScope.loginUser.userPk}">
<input id="hiddenUserCategory" type="hidden" value="${sessionScope.loginUser.userCategory}">

<div class="border-main-container">
	<button id="goUp" type="button" onclick="up()"></button>

	<div class="recVideo-container">
		<h2>WATNET 추천 영상</h2>
		<div class="recVideo-img">
			<img id="recVideo_img1" src="https://img.youtube.com/vi/FaEDnEwfQEw/mqdefault.jpg"
				alt="watnet recommand video 1">
			<img id="recVideo_img2" src="https://img.youtube.com/vi/gE3-PqU7SOE/mqdefault.jpg"
				alt="watnet recommand video 2">
			<img id="recVideo_img3" src="https://img.youtube.com/vi/4hWtJZ4BgSw/mqdefault.jpg"
				alt="watnet recommand video 3">
			<img id="recVideo_img4" src="https://img.youtube.com/vi/ME9IMbWkn1Y/mqdefault.jpg"
				alt="watnet recommand video 4">
		</div>
	</div>

	<div class="recVideo_modal hidden">
		<div class="recVideo_md_overlay"></div>
		<div class="recVideo_md_content">
			<iframe id="recVideo_iframe" width="100%" height="100%"
				src="" frameborder="0"
				allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
				allowfullscreen></iframe>
			<button type="button" id="recVideo_md_close">X</button>
		</div>
	</div>

	<div class="board-header">
		<h2>WATCHA</h2>
		<c:if test="${sessionScope.loginUser != null}">
			<input id="loginUserPNum" type="hidden" value="${sessionScope.loginUser.pNum}">
			<button id="makePartyBtn" type="button">파티 만들기</button>
		</c:if>
	</div>
	<div class="board-container">

	</div>
	<div class="board-footer">
		<input id="currentPage" type="hidden" value="1">
		<input id="maxPage" type="hidden" value="${maxPageNum}">
		<button id="moreSelect" type="button">더 보기</button>
	</div>
</div>