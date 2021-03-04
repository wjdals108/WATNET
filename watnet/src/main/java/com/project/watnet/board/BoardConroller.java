package com.project.watnet.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import com.project.watnet.model.BoardDTO;
import com.project.watnet.model.BoardEntity;

@Controller
@RequestMapping("/board")
public class BoardConroller {

	@Autowired
	private BoardService service;
	
	@GetMapping("/netflix")
	public void netflix(BoardDTO p, Model model) {
		p.setCategory(1);
		p.setRowCnt(20);
		model.addAttribute("maxPageNum", service.selMaxPageNum(p));
	}
	
	@GetMapping("/watcha")
	public void watcha(BoardDTO p, Model model) {
		p.setCategory(2);
		p.setRowCnt(20);
		model.addAttribute("maxPageNum", service.selMaxPageNum(p));
	}
	
	@GetMapping("/makeParty")
	public void makeParty() {}
	
	@GetMapping("/detail")
	public void detail(BoardEntity p, Model model) {
		model.addAttribute("leaderPk", service.getLeaderPk(p));
	}
	
	@GetMapping("/contents")
	public void contents() {}

}
