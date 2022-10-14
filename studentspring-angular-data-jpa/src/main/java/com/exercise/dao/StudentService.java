package com.exercise.dao;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.exercise.model.Student;

@Service
public class StudentService {
	
	@Autowired
	StudentRepository studentRepository;
	
	// Search
		public List<Student> getAllStudents() {
			
			return studentRepository.findAll();
		}


		public List<Student> getStudentByIdOrNameOrCourse(String Id, String name, String course) {
			return studentRepository.findDistinctByStudentIdContainingOrStudentNameContainingOrCourse_CourseNameContaining(Id, name, course);
		}
		
		
		//Add
		public void addStudent(Student student){
			studentRepository.save(student); 
		}
		
		
		//Update
		 public Student getStudentbyStudentId(String id) {
			 return studentRepository.findByStudentId(id);
		 }
		
		public Student updateStudent(Student student) {
			return studentRepository.save(student);
		}
		
		
		//Delete
		public void deleteStudent(String id) {
			studentRepository.deleteStudentById(id);
			studentRepository.deleteById(id);
			
		}
		

}
