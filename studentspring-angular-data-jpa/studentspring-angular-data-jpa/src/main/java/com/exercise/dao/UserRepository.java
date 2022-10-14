package com.exercise.dao;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.exercise.model.User;

@Repository
public interface UserRepository extends CrudRepository<User, String>{
	
	
	User findAllByUserID(String id);
	
	List<User> findAllByUserIDOrUserName(String id,String name);
	
	User findByUserName(String Name);
	
	Boolean existsByUserNameAndUserPassword(String name,String password);
	
}