package com.project.watnet.board;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.project.watnet.model.BoardDTO;
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
	
	public List<BoardEntity> selBoardList(BoardDTO p) {
		p.setsIdx(p.getRowCnt() * (p.getPage() - 1));
		return mapper.selBoardList(p);
	}
	
	public int selMaxPageNum(BoardDTO p) {
		return mapper.selMaxPageNum(p);
	}
}
