package com.project.watnet.board;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.BoardDTO;
import com.project.watnet.model.BoardEntity;

@Mapper
public interface BoardMapper {
	int insBoard(BoardEntity p);
	List<BoardEntity> selBoardList(BoardDTO p);
	int selMaxPageNum(BoardDTO p);
}
