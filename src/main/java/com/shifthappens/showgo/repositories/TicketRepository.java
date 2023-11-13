package com.shifthappens.showgo.repositories;

import java.util.List;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.entities.Ticket;
import com.shifthappens.showgo.entities.User;

@Repository
public interface TicketRepository extends CrudRepository<Ticket, String>{
    List<Ticket> findByEvent(Event event);

    List<Ticket> findByEventGuid(String eventGuid);

    List<Ticket> findByOwner(User owner);
}
