package com.project.watnet;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.BoardManageEntity;

@Mapper
public interface CommonMapper {
	List<BoardManageEntity> selMenuList();
}
