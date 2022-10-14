package com.exercise.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import com.exercise.dao.CourseService;
import com.exercise.dao.StudentService;
import com.exercise.model.Student;
import com.exercise.model.User;

@CrossOrigin(origins = "http://localhost:4200")
@RestController
@RequestMapping("/api/v1/") 
public class StudentController {
	@Autowired
	private StudentService studentService;
	@Autowired
	private CourseService courseService;
	
	@GetMapping(value="/student",produces = "application/json")
	public List<Student> displayView() {	
		
	 	List<Student> studentlist = studentService.getAllStudents();
	 
		return studentlist;
	} 
	
	@GetMapping(value="/student/{studentId}/{studentName}",produces = "application/json")
	public List<Student> usersearch(@PathVariable String studentId,@PathVariable String studentName) {
		List<Student> searchlist = new ArrayList<>();
		searchlist =studentService.getStudentByIdOrNameOrCourse(studentId, studentName,"");
		
			
		return searchlist;
	}
	@PostMapping(value="/student",produces = "application/json")
	public ResponseEntity<Student> addstudent(@RequestBody Student student) {
		
		
		        Student studentBean=new Student();
		        studentBean.setStudentId(student.getStudentId());
		        studentBean.setStudentName(student.getStudentName());
		        studentBean.setDob(student.getDob());
		        studentBean.setGender(student.getGender());
		        studentBean.setEducation(student.getEducation());
		        studentBean.setCourse(student.getCourse());
				studentService.addStudent(studentBean);
				
				return ResponseEntity.ok(studentBean);
			
		
	}
	@GetMapping(value="/student/{studentId}",produces = "application/json")
	public ResponseEntity<Student> getUserByStudentId(@PathVariable String studentId) {
	Student student=new Student();
	student=studentService.getStudentbyStudentId(studentId);
	return ResponseEntity.ok(student);
	}
	
	@PutMapping(value="/student/{studentId}",produces = "application/json")
	public ResponseEntity<Student> updateStudent(@PathVariable String studentId, @RequestBody Student student) {
		
		
		 Student studentBean=new Student();
	        studentBean.setStudentId(student.getStudentId());
	        studentBean.setStudentName(student.getStudentName());
	        studentBean.setDob(student.getDob());
	        studentBean.setGender(student.getGender());
	        studentBean.setEducation(student.getEducation());
	        studentBean.setCourse(student.getCourse());
			studentService.addStudent(studentBean);
			Student	updatestudent=	studentService.updateStudent(studentBean);				
				
					 return ResponseEntity.ok(updatestudent);
				
		}
	
	@DeleteMapping("/student/{studentId}")
	public  ResponseEntity<Map<String, Boolean>> deletestudent(@PathVariable String studentId) {
		
		studentService.deleteStudent(studentId);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return ResponseEntity.ok(response);
	}
	
}
