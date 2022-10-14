package com.exercise.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exercise.model.User;

@Service
public class UserService {

	@Autowired
	UserRepository usersRepository;

	//Login
	
	
	public Boolean getUserNameandPassword(String name, String password) {
		return usersRepository.existsByUserNameAndUserPassword(name, password);
	}
	
	// Search
	public List<User> getAllUsers() {
		List<User> userlist = (List<User>) usersRepository.findAll();
		return userlist;
	}

	

	public List<User> getUserByIdOrName(String Id, String name) {
		return usersRepository.findAllByUserIDOrUserName(Id, name);
	}

	// Add
	public void addUser(User user) {
		usersRepository.save(user);
	}

	// Update
	 public User getUserbyUserId(String id) {
		 return usersRepository.findAllByUserID(id);
	 }

	public User updateUser(User user) {
		return usersRepository.save(user);
	}

	// Delete
	public void deleteUser(String Id) {
		usersRepository.deleteById(Id);
	}
}
