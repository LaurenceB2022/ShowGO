package com.shifthappens.showgo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.User;

@Repository
public interface UserRepository extends CrudRepository<User, Integer>{
    User findByUsername(String username);
}
