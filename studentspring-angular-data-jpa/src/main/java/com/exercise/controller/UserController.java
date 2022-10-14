package com.exercise.controller;


import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;

import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.exercise.dao.UserService;
import com.exercise.model.User;
import com.exercise.report.ReportService;
import com.exercise.report.UserReportService;

import net.sf.jasperreports.engine.JRException;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/") 
public class UserController {
	@Autowired
	private UserService userService;
	@Autowired
	private UserReportService service;
	@GetMapping(value="/user",produces = "application/json")
	public List<User> displayView() {
		List<User> userlist=userService.getAllUsers();
		
		return userlist;
	}


	@GetMapping(value="/user/{userId}/{userName}",produces = "application/json")
	public List<User> usersearch(@PathVariable String userId,@PathVariable String userName) {
		List<User> searchlist = new ArrayList<>();
		searchlist = userService.getUserByIdOrName(userId, userName);
		
			
		return searchlist;
	}
	@GetMapping(value="/user/{userName}/{userPassword}/{id}",produces = "application/json")
	public ResponseEntity<User> userLogin(@PathVariable String userName,@PathVariable String userPassword) {
	    User condition=userService.getUserNameandPassword(userName, userPassword);
		return ResponseEntity.ok(condition);
	}

	@GetMapping(value="/user/{userId}",produces = "application/json")
	public ResponseEntity<User> getUserByUserId(@PathVariable String userId) {
	User user=new User();
	user=userService.getUserbyUserId(userId);
	return ResponseEntity.ok(user);
	}
	@PostMapping(value="/user",produces = "application/json")
	public ResponseEntity<User> addUser(@RequestBody User user) {
		
		
		               User userBean=new User();
		               userBean.setUserID(user.getUserID());
		               userBean.setUserName(user.getUserName());
		               userBean.setUserEmail(user.getUserEmail());
		               userBean.setUserPassword(user.getUserPassword());
		               userBean.setUserConfirmPassword(user.getUserConfirmPassword());
		               userBean.setUserRole(user.getUserRole());
				       userService.addUser(userBean);
				    
					return ResponseEntity.ok(userBean);
	}
	@PutMapping(value="/user/{userId}",produces = "application/json")
	public ResponseEntity<User> updateUser(@PathVariable String userId, @RequestBody User user) {
		
			
					       
		 User userBean=new User();
         userBean.setUserID(user.getUserID());
         userBean.setUserName(user.getUserName());
         userBean.setUserEmail(user.getUserEmail());
         userBean.setUserPassword(user.getUserPassword());
         userBean.setUserConfirmPassword(user.getUserConfirmPassword());
         userBean.setUserRole(user.getUserRole());
	     User  updateuser= userService.updateUser(userBean);
						    
		return ResponseEntity.ok(updateuser);
					
		}
	
	@DeleteMapping("/user/{userId}")
	public ResponseEntity<Map<String, Boolean>> deleteuser(@PathVariable String userId) {
		userService.deleteUser(userId);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	@GetMapping(value="/report/{format}",produces = "application/json")
	public ResponseEntity<Map<String,String>>  generateReport(@PathVariable String format,HttpServletResponse response) throws JRException, IOException{
        String flag=  service.exportReport(format,response);
        Map<String,String> responsetoangular = new HashMap<>();
		responsetoangular .put("flag",flag);
		return ResponseEntity.ok(responsetoangular);
        		
        		
	}
}