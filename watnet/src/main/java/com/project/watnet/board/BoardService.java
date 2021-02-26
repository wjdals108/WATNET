package com.project.watnet.board;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.watnet.model.BoardEntity;

@Service
public class BoardService {

	@Autowired
	private BoardMapper mapper;
	
	//0: insBoard 실패		그외: category return
	public int insBoard(BoardEntity p) {
		if(mapper.insBoard(p) == 1) {
			return p.getCategory();
		}
		return 0;
	}
}
