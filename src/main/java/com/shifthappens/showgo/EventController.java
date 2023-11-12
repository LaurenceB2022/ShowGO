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

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.repositories.EventRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EventController {

    private final EventRepository eventRepo;

    public EventController(EventRepository eventRepo) {
        this.eventRepo = eventRepo;
    }

    @GetMapping("/events")
    public List<Event> findAll() {
        List<Event> events = new ArrayList<Event>();
        eventRepo.findAll().forEach(event -> events.add(event));
        return events;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/events")//dates formatted "MMM DD YYYY"
    public Event makeEvent(@RequestBody Event event) {
        return eventRepo.save(event);
    }

    @DeleteMapping("/events/{guid}")
    public void deleteEvent(@PathVariable String guid) {
        eventRepo.delete(eventRepo.findByguid(guid));
    }

    @GetMapping("/events/venue/{username}")
    public List<Event> findEventsByVenueUsername(@PathVariable String username) {
        List<Event> Event = eventRepo.findByVenueUsername(username);
        if (Event == null) {
            throw new InvalidUsernameException();
        }
        return Event;
    }

    @GetMapping("/events/venue/")
    public List<Event> findEventsByVenue(@RequestBody Venue venue) {
        List<Event> events = eventRepo.findByVenue(venue);
        if (events == null) {
            throw new InvalidUsernameException();
        }
        return events;
    }

    @GetMapping("/events/{search}")
    public List<Event> findBySearch(@PathVariable String search) {
        return eventRepo.findBySearch(search);
    }

    @GetMapping("/events/{guid}/{areaToUpate}/{update}")
    public void update(@PathVariable String guid, @PathVariable String areaToUpdate, @PathVariable String update) {
        Event tr = eventRepo.findByguid(guid);
        if (areaToUpdate.equals("start_date"))
            tr.setStartDate(update);
        else if (areaToUpdate.equals("end_date"))
            tr.setEndDate(update);
        else if (areaToUpdate.equals("ticket_price"))
            tr.setTicket_price(Float.parseFloat(update));
        else if (areaToUpdate.equals("name"))
            tr.setName(update);
        else if (areaToUpdate.equals("description"))
            tr.setDescription(update);
        else if (areaToUpdate.equals("location"))
            tr.setLocation(update);
        else if (areaToUpdate.equals("hide_location"))
            tr.setHide_location(Boolean.parseBoolean(update));
        eventRepo.save(tr);
    }

}
