package com.shifthappens.showgo.repositories;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.entities.Ticket;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, String>{
    List<Ticket> findByEvent(Event event);

    List<Ticket> findByEventGuid(String eventGuid);

    @Query(value = "SELECT * FROM tickets t, users u WHERE u.username = :username",
            nativeQuery = true)
    List<Ticket> findByOwnerUsername(String username);
}
