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
import com.shifthappens.showgo.repositories.BlockedUserRepository;
import com.shifthappens.showgo.repositories.TicketRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class TicketController {
    private final TicketRepository ticketRepo;

    private final BlockedUserRepository blockedUserRepo;

    public TicketController(TicketRepository ticketRepo, BlockedUserRepository blockedUserRepo) {
        this.ticketRepo = ticketRepo;
        this.blockedUserRepo = blockedUserRepo;
    }
    //gets tickets for an event by searching using said event's guid
    @GetMapping("/tickets/{eventGuid}")
    public List<Ticket> findByEventGuid(@PathVariable String eventGuid) {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByEventGuid(eventGuid).forEach(ticket -> tickets.add(ticket));
        return tickets;
    }
    //gets tickets for a specific user
    @GetMapping("/tickets/user/{username}")
    public List<Ticket> findByOwner(@PathVariable String username) {
        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByOwnerUsername(username).forEach(ticket -> tickets.add(ticket));
        return tickets;
    }
    //give the user a ticket to an event
    @PostMapping("/tickets")
    public Ticket createTicket(@RequestBody Ticket ticket) {
        if (ticket == null) {
            throw new InvalidTicketBuyException("Ticket is null");
        }
        if (blockedUserRepo.findByUserAndVenue(ticket.getOwner().getUsername(), ticket.getEvent().getVenue().getUsername()) != null) {
            throw new InvalidTicketBuyException("Buyer is a blocked user");
        }

        List<Ticket> tickets = new ArrayList<>();
        ticketRepo.findByEvent(ticket.getEvent()).forEach(t -> tickets.add(t));
        
        if (tickets.size() >= ticket.getEvent().getMax_attendees()) throw new InvalidTicketBuyException("Event is at maximum attendance");
        return ticketRepo.save(ticket);
    }
    //remove a ticket from the total ticket repository
    @DeleteMapping("/tickets")
    public void deleteTicket(@RequestBody Ticket ticket) {
        ticketRepo.delete(ticket);
    }
    //remove a ticket from the total ticket repository via searching through its guid
    @DeleteMapping("/tickets/{guid}")
    public void deleteTicketByGuid(@PathVariable String guid) {
        ticketRepo.delete(ticketRepo.findByGuid(guid));
    }
    //redeem a ticket by finding it via its guid
    @PostMapping("/tickets/redeem/{guid}")
    public Ticket redeemTicket(@PathVariable String guid) {
        Ticket ticket = ticketRepo.findByGuid(guid);
        if (ticket == null) {
            throw new InvalidGuidException();
        }
        ticket.setRedeemed(true);

        return ticketRepo.save(ticket);
    }
    //redeem a ticket
    @PostMapping("/tickets/redeem")
    public Ticket redeemTicket(@RequestBody Ticket ticket) {
        if (ticket == null) {
            throw new InvalidGuidException();
        }
        ticket.setRedeemed(true);
        return ticketRepo.save(ticket);
    }
}