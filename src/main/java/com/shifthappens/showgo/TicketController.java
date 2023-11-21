package com.shifthappens.showgo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.Ticket;
import com.shifthappens.showgo.exceptions.InvalidTicketBuyException;
import com.shifthappens.showgo.repositories.TicketRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TicketController {
    private final TicketRepository ticketRepo;

    public TicketController(TicketRepository ticketRepo) {
        this.ticketRepo = ticketRepo;
    }

    @GetMapping("/tickets/{eventGuid}")
    private List<Ticket> findByEventGuid(@PathVariable String eventGuid) {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByEventGuid(eventGuid).forEach(ticket -> tickets.add(ticket));
        return tickets;
    }

    @GetMapping("/tickets/user/{username}")
    private List<Ticket> findByOwner(@PathVariable String username) {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByOwnerUsername(username).forEach(ticket -> tickets.add(ticket));
        return tickets;
    }

    @PostMapping("/tickets")
    private Ticket createTicket(@RequestBody Ticket ticket) {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByEvent(ticket.getEvent()).forEach(t -> tickets.add(t));
        
        if (tickets.size() >= ticket.getEvent().getMax_attendees()) throw new InvalidTicketBuyException();
        return ticketRepo.save(ticket);
    }
}