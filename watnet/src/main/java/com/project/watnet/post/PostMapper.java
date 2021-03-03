package com.project.watnet.post;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.PostDomain;
import com.project.watnet.model.PostEntity;

@Mapper
public interface PostMapper {
	int insPost(PostEntity p);
	List<PostDomain> selPost(PostEntity p);
}
