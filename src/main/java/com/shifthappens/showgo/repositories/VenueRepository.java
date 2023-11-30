package com.shifthappens.showgo.repositories;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.Venue;

@Repository
public interface VenueRepository extends CrudRepository<Venue, String>{
    Venue findByUsername(String username);
}
