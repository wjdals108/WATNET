package com.project.watnet.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.project.watnet.model.BoardEntity;

@RequestMapping("/boardAjax")
@RestController
public class BoardAjaxController {

	@Autowired
	private BoardService service;
	
	@PostMapping
	public int makeParty(@RequestBody BoardEntity p) {
		return service.insBoard(p);
	}
}
