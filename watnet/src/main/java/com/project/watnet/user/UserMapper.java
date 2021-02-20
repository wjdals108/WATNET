package com.project.watnet.user;

import org.apache.ibatis.annotations.Mapper;

import com.project.watnet.model.UserDomain;
import com.project.watnet.model.UserEntity;

@Mapper
public interface UserMapper {
	int insUser(UserDomain p);
	UserEntity selUser(UserEntity p);
	UserEntity selNickname(UserEntity p);
}
