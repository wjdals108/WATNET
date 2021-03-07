<%@ page language="java" contentType="text/html; charset=EUC-KR"
    pageEncoding="EUC-KR"%>
<input type="hidden" id="currentPage" value="2">
<button id="goUp" type="button" onclick="up()"></button>

<div class="contents-container">
	<span class="contents-info">버튼을 클릭하시면 해당 사이트의 Contents가 출력됩니다.<br>각 Content를 클릭하시면 관련사이트에서 정보를 확인하실 수 있습니다.</span>
	<div class="contentBtn-container">
		<input type="button" id="netflixBtn" value="NETFLIX">
		<input type="button" id="watchaBtn" value="WATCHA">
	</div>
	<div id="conList"></div>
</div>