package com.exercise.dao;

import java.util.List;

import javax.transaction.Transactional;

import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.exercise.model.Student;

@Repository
public interface StudentRepository extends CrudRepository<Student, String>{
	
	List<Student> findAll();
	List<Student> findDistinctByStudentIdContainingOrStudentNameContainingOrCourse_CourseNameContaining(String studentId, String studentName, String courseName);
	
	Student findByStudentId(String id);
	@Modifying
    @Transactional
    @Query(value = "delete from student_course s where s.student_id = ?1 ", nativeQuery = true)
    void deleteStudentById(String id);
	
}
