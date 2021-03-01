package com.project.watnet.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.watnet.model.BoardDTO;
import com.project.watnet.model.BoardDomain;
import com.project.watnet.model.BoardEntity;
import com.project.watnet.model.PartyUserEntity;

@RequestMapping("/boardAjax")
@RestController
public class BoardAjaxController {

	@Autowired
	private BoardService service;
	
	@PostMapping
	public int makeParty(@RequestBody BoardDomain p) {
		return service.insBoard(p);
	}
	
	@PostMapping("/joinParty")
	public int joinParty(@RequestBody PartyUserEntity p) {
		return service.joinParty(p);
	}
	
	@GetMapping
	public List<BoardEntity> selBoardList(BoardDTO p) {
		p.setRowCnt(20);
		return service.selBoardList(p);
	}
	
	@GetMapping("/selBoard")
	public BoardEntity selBoard(BoardEntity p) {
		return service.selBoard(p);
	}
}
