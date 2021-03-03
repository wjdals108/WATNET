package com.project.watnet.model;

public class PostEntity {
	private int postPk;
	private int boardPk;
	private int sendUserPk;
	private String ctnt;
	private String regDt;
	private int isDel;
	
	public int getPostPk() {
		return postPk;
	}
	public void setPostPk(int postPk) {
		this.postPk = postPk;
	}
	public int getBoardPk() {
		return boardPk;
	}
	public void setBoardPk(int boardPk) {
		this.boardPk = boardPk;
	}
	public int getSendUserPk() {
		return sendUserPk;
	}
	public void setSendUserPk(int sendUserPk) {
		this.sendUserPk = sendUserPk;
	}
	public String getCtnt() {
		return ctnt;
	}
	public void setCtnt(String ctnt) {
		this.ctnt = ctnt;
	}
	public String getRegDt() {
		return regDt;
	}
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}
	public int getIsDel() {
		return isDel;
	}
	public void setIsDel(int isDel) {
		this.isDel = isDel;
	}
	
}
