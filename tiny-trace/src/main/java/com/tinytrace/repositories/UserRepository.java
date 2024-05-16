package com.tinytrace.repositories;

import com.tinytrace.entities.User;
import org.springframework.data.repository.CrudRepository;


public interface UserRepository extends CrudRepository<User, Long> {

}
