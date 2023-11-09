package com.shifthappens.showgo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.entities.Venue;

@Repository
public interface EventRepository extends CrudRepository<Event, String>{
    Event findByguid(String guidString);

    List<Event> findByVenue(Venue venue);

    @Query(value = "SELECT * FROM events e WHERE e.venue = :venue",
            nativeQuery = true)
    List<Event> findByVenueUsername(@Param("venue") String venueUsername);

    @Query(value = "SELECT * FROM events e WHERE e.guid LIKE :input OR e.venue LIKE :input OR e.start_date LIKE :input OR e.end_date LIKE :input LIKE :input OR e.name LIKE :input OR e.description LIKE :input OR e.location LIKE :input"
             , nativeQuery = true)
    List<Event> findBySearch(@Param("input") String input);
}
