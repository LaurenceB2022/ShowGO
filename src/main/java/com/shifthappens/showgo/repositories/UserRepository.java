package com.shifthappens.showgo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.User;
/*
 * This UserRepository file is the repository that maps our database requests for our project
 */
@Repository
public interface UserRepository extends CrudRepository<User, String>{
    User findByUsername(String username);
}
