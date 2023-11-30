package com.shifthappens.showgo;

import java.time.format.DateTimeFormatter;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.Event;
import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidEventCreationException;
import com.shifthappens.showgo.exceptions.InvalidGuidException;
import com.shifthappens.showgo.exceptions.InvalidSearchException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.repositories.EventRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class EventController {

    private final EventRepository eventRepo;
    private final DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd yyyy hh:mm a");

    public EventController(EventRepository eventRepo) {
        this.eventRepo = eventRepo;
    }

    //Find all events
    @GetMapping("/events")
    public List<Event> findAll() {
        List<Event> events = new ArrayList<Event>();
        eventRepo.findAll().forEach(event -> events.add(event));
        return events;
    }

    //Find one event by its guid
    @GetMapping("/events/{guid}")
    public Event findEventByGuid(@PathVariable String guid) {
        Event event =  eventRepo.findByguid(guid);
        if (event == null) {
            throw new InvalidGuidException();
        }
        return event;
    }

    //Create an event from the inputted event object from the HTTP request body JSON object
    @PostMapping("/events")
    public Event makeEvent(@RequestBody Event event) {
        checkParams(event);
        return eventRepo.save(event);
    }

    //Delete the event matching the inputted guid
    @DeleteMapping("/events/{guid}")
    public void deleteEvent(@PathVariable String guid) {
        eventRepo.delete(eventRepo.findByguid(guid));
    }

    //Get all events made by the inputted venue username
    @GetMapping("/events/venue/{username}")
    public List<Event> findEventsByVenueUsername(@PathVariable String username) {
        List<Event> Event = eventRepo.findByVenueUsername(username);
        if (Event == null) {
            throw new InvalidUsernameException();
        }
        return Event;
    }

    //Get all events made by the inputted venue object from the HTTP request body JSON object
    @GetMapping("/events/venue/")
    public List<Event> findEventsByVenue(@RequestBody Venue venue) {
        List<Event> events = eventRepo.findByVenue(venue);
        if (events == null) {
            throw new InvalidUsernameException();
        }
        return events;
    }

    protected List<Event> findBySearch(@PathVariable String search) {
        return eventRepo.findBySearch(search);
    }

    //Update an event's settings by the inputted event object from the HTTP request body JSON object and inputted guid
    @PostMapping("/events/{guid}")
    public void update(@PathVariable String guid, @RequestBody Event e) {
        checkParams(e);
        Event tr = eventRepo.findByguid(guid);
            tr.setStart_date(e.getStart_date());
            tr.setEnd_date(e.getEnd_date());
            tr.setTicket_price(e.getTicket_price());
            tr.setName(e.getName());
            tr.setDescription(e.getDescription());
            tr.setLocation(e.getLocation());
            tr.setHide_location(e.isHide_location());
        eventRepo.save(tr);
    }

    //Search events by a price range, date range, and/or a search input
    @GetMapping("/events/filters/{search}/{startDateTimeS}/{endDateTimeS}/{lowerPriceS}/{upperPriceS}")
    public List<Event> findBySearchAndFilter(@PathVariable String search, @PathVariable String startDateTimeS, @PathVariable String endDateTimeS, @PathVariable String lowerPriceS, @PathVariable String upperPriceS) {
        final boolean hasSearch = !search.equals("");
        final boolean hasDates = !startDateTimeS.equals("null") && !endDateTimeS.equals("null");
        final boolean hasPrices = !lowerPriceS.equals(String.valueOf(-1)) && !upperPriceS.equals(String.valueOf(-1));
        LocalDateTime startDateTime = null;
        LocalDateTime endDateTime = null;
        double lowerPrice = -1;
        double upperPrice = -1;
        List<Event> events = null;

        if (hasSearch) {//if a search parameter was inputted
            events = findBySearch(search);
        }
        else {
            events = findAll();
        }
        if (hasPrices) {//if a price range was inputted
            try {
                lowerPrice = Double.parseDouble(lowerPriceS);
                upperPrice = Double.parseDouble(upperPriceS);
            }
            catch (Exception e) {
                throw new InvalidSearchException("Invalid price bounds");
            }
        }
        if (hasDates) {//if a date range was inputted
            try {
                startDateTime = LocalDateTime.parse(startDateTimeS, formatter);
                endDateTime = LocalDateTime.parse(endDateTimeS, formatter);
            }
            catch (Exception e) {
                throw new InvalidSearchException("Invalid date format");
            }
        }
        if (hasPrices || hasDates) {
            return filterHelper(lowerPrice, upperPrice, startDateTime, endDateTime, events);   
        }
        else {
            return events;
        }
    }

    protected List<Event> filterHelper(final double innerLowerPrice, final double innerUpperPrice, final LocalDateTime innerStartDateTime, final LocalDateTime innerEndDateTime, List<Event> events) {
        List<Event> rtrn = events.stream().filter(event -> {
            if (innerLowerPrice != -1) {//if there is a price range, filter by price range
                if (event.getTicket_price() < innerLowerPrice || event.getTicket_price() > innerUpperPrice) {
                    return false;
                }
            }
            if (innerStartDateTime != null) {//if there is a date range, filter by date range
                try {
                    String startDate = event.getStart_date();
                    LocalDateTime eventTime = LocalDateTime.parse(startDate, formatter);
                    if (eventTime.isBefore(innerStartDateTime) || eventTime.isAfter(innerEndDateTime)) {
                        return false;
                    }
                }   
                catch (Exception e) {
                    return false;
                }
            }
            return true;
        }).collect(Collectors.toList());
    return rtrn == null ? new ArrayList<Event>() : rtrn;
    }

    //Used to check whether an event is valid, throws InvalidEventCreationException if not
    protected void checkParams(Event event) {
        if (event.getStart_date() != null && event.getEnd_date() != null) {
            LocalDateTime start_date = LocalDateTime.parse(event.getStart_date(), formatter);
            LocalDateTime end_date = LocalDateTime.parse(event.getEnd_date(), formatter);

            if (end_date.isBefore(start_date)) {
                throw new InvalidEventCreationException("Invalid date range");
            }
        }
        if (event.getName().equals("")) {
            throw new InvalidEventCreationException("Invalid name");
        }
        if (event.getMax_attendees() <= 0) {
            throw new InvalidEventCreationException("Invalid max attendees");
        }
        if (event.getTicket_price() <= 0) {
            throw new InvalidEventCreationException("Invalid ticket price");
        }
        if (event.getDescription() != null && event.getDescription().length() > 1000 || event.getDescription().equals("")) {
            throw new InvalidEventCreationException("Invalid description length");
        }
        if (event.getLocation() != null && event.getLocation().length() > 100) {
            throw new InvalidEventCreationException("Invalid location");
        }
    }

}
