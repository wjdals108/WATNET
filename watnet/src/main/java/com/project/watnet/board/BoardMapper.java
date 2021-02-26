package com.project.watnet.board;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.BoardEntity;

@Mapper
public interface BoardMapper {
	int insBoard(BoardEntity p);
}
