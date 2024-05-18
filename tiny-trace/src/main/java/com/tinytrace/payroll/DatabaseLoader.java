package com.tinytrace.payroll;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.tinytrace.models.User;
import com.tinytrace.repositories.UserRepository;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository employeeRepository;
    private final UserRepository userRepository;

    @Autowired
    public DatabaseLoader(EmployeeRepository employeeRepository, UserRepository userRepository) {
        this.employeeRepository = employeeRepository;
        this.userRepository = userRepository; 
    }

    @Override
    public void run(String ... strings) throws Exception {
        this.employeeRepository.save(new Employee("Frodo", "Baggins", "ring bearer"));
        this.userRepository.save(new User("admin@gmail.com", "admin", "admin123"));
        this.userRepository.save(new User("worker@gmail.com", "worker", "worker123"));
    }
    
}
