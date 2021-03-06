package com.project.watnet.model;

public class BoardEntity {
	
	private int boardPk;
	private int category;
	private String title;
	private String shareId;
	private String sharePw;
	private int leaderPk;
	private String leaderpNum;
	private String startDt;
	private String endDt;
	private int price;
	private int tempPoint;
	private String ctnt;
	private int recruitNum;
	private int isDel;
	
	
	public int getTempPoint() {
		return tempPoint;
	}
	public void setTempPoint(int tempPoint) {
		this.tempPoint = tempPoint;
	}
	public int getLeaderPk() {
		return leaderPk;
	}
	public void setLeaderPk(int leaderPk) {
		this.leaderPk = leaderPk;
	}
	public int getBoardPk() {
		return boardPk;
	}
	public void setBoardPk(int boardPk) {
		this.boardPk = boardPk;
	}
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public String getTitle() {
		return title;
	}
	public void setTitle(String title) {
		this.title = title;
	}
	public String getShareId() {
		return shareId;
	}
	public void setShareId(String shareId) {
		this.shareId = shareId;
	}
	public String getSharePw() {
		return sharePw;
	}
	public void setSharePw(String sharePw) {
		this.sharePw = sharePw;
	}
	public String getLeaderpNum() {
		return leaderpNum;
	}
	public void setLeaderpNum(String leaderpNum) {
		this.leaderpNum = leaderpNum.replace("-", "");
	}
	public String getStartDt() {
		return startDt;
	}
	public void setStartDt(String startDt) {
		this.startDt = startDt;
	}
	public String getEndDt() {
		return endDt;
	}
	public void setEndDt(String endDt) {
		this.endDt = endDt;
	}
	public int getPrice() {
		return price;
	}
	public void setPrice(int price) {
		this.price = price;
	}
	public String getCtnt() {
		return ctnt;
	}
	public void setCtnt(String ctnt) {
		this.ctnt = ctnt;
	}
	public int getRecruitNum() {
		return recruitNum;
	}
	public void setRecruitNum(int recruitNum) {
		this.recruitNum = recruitNum;
	}
	public int getIsDel() {
		return isDel;
	}
	public void setIsDel(int isDel) {
		this.isDel = isDel;
	}
}
