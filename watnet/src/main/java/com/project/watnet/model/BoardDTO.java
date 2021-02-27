package com.project.watnet.model;

public class BoardDTO {
	private int category;
	private int page;
	private int sIdx;
	private int rowCnt;
	
	public int getCategory() {
		return category;
	}
	public void setCategory(int category) {
		this.category = category;
	}
	public int getPage() {
		return page;
	}
	public void setPage(int page) {
		this.page = page;
	}
	public int getsIdx() {
		return sIdx;
	}
	public void setsIdx(int sIdx) {
		this.sIdx = sIdx;
	}
	public int getRowCnt() {
		return rowCnt;
	}
	public void setRowCnt(int rowCnt) {
		this.rowCnt = rowCnt;
	}
}
