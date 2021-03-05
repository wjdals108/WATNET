package com.project.watnet.model;

public class PointHistoryEntity {
	private int historyPk;
	private int userPk;
	private int point;
	private String regDt;
	private int result;
	
	public int getHistoryPk() {
		return historyPk;
	}
	public void setHistoryPk(int historyPk) {
		this.historyPk = historyPk;
	}
	public int getUserPk() {
		return userPk;
	}
	public void setUserPk(int userPk) {
		this.userPk = userPk;
	}
	public int getPoint() {
		return point;
	}
	public void setPoint(int point) {
		this.point = point;
	}
	public String getRegDt() {
		return regDt;
	}
	public void setRegDt(String regDt) {
		this.regDt = regDt;
	}
	public int getResult() {
		return result;
	}
	public void setResult(int result) {
		this.result = result;
	}
}
