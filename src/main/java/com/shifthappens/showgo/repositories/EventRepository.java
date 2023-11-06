package com.shifthappens.showgo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.Event;

@Repository
public interface EventRepository extends CrudRepository<Event, String>{
    Event findByguid(String guidString);
}
