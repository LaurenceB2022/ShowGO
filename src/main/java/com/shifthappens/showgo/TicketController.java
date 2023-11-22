package com.shifthappens.showgo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.Ticket;
import com.shifthappens.showgo.exceptions.InvalidGuidException;
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
    public List<Ticket> findByEventGuid(@PathVariable String eventGuid) {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByEventGuid(eventGuid).forEach(ticket -> tickets.add(ticket));
        return tickets;
    }

    @GetMapping("/tickets/user/{username}")
    public List<Ticket> findByOwner(@PathVariable String username) {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByOwnerUsername(username).forEach(ticket -> tickets.add(ticket));
        return tickets;
    }

    @PostMapping("/tickets")
    public Ticket createTicket(@RequestBody Ticket ticket) {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByEvent(ticket.getEvent()).forEach(t -> tickets.add(t));
        
        if (tickets.size() >= ticket.getEvent().getMax_attendees()) throw new InvalidTicketBuyException();
        return ticketRepo.save(ticket);
    }

    @DeleteMapping("/tickets")
    public void deleteTicket(@RequestBody Ticket ticket) {
        ticketRepo.delete(ticket);
    }

    @DeleteMapping("/tickets/{guid}")
    public void deleteTicketByGuid(@PathVariable String guid) {
        ticketRepo.delete(ticketRepo.findByGuid(guid));
    }

    @PostMapping("/tickets/redeem/{guid}")
    public Ticket redeemTicket(@PathVariable String guid) {
        Ticket ticket = ticketRepo.findByGuid(guid);
        if (ticket == null) {
            throw new InvalidGuidException();
        }
        ticket.setRedeemed(true);

        return ticketRepo.save(ticket);
    }

    @PostMapping("/tickets/redeem")
    public Ticket redeemTicket(@RequestBody Ticket ticket) {
        if (ticket == null) {
            throw new InvalidGuidException();
        }
        ticket.setRedeemed(true);
        return ticketRepo.save(ticket);
    }
}