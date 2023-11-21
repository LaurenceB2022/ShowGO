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

    @GetMapping("/events")
    public List<Event> findAll() {
        List<Event> events = new ArrayList<Event>();
        eventRepo.findAll().forEach(event -> events.add(event));
        return events;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/events")//dates formatted "MMM DD YYYY "
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

    @GetMapping("/events/{guid}/{areaToUpdate}/{update}")
    public void update(@PathVariable String guid, @PathVariable String areaToUpdate, @PathVariable String update) {
        Event tr = eventRepo.findByguid(guid);
        if (areaToUpdate.equals("start_date"))
            tr.setStart_date(update);
        else if (areaToUpdate.equals("end_date"))
            tr.setEnd_date(update);
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

    @GetMapping("/events/filters/{search}/{startDateTimeS}/{endDateTimeS}/{lowerPriceS}/{upperPriceS}")
    public List<Event> findBySearchAndFilter(@PathVariable String search, @PathVariable String startDateTimeS, @PathVariable String endDateTimeS, @PathVariable String lowerPriceS, @PathVariable String upperPriceS) {
        List<Event> rtrn = null;
        final boolean hasSearch = !search.equals("");
        final boolean hasDates = !startDateTimeS.equals("") && !endDateTimeS.equals("");
        final boolean hasPrices = !lowerPriceS.equals("") && !upperPriceS.equals("");
        LocalDateTime startDateTime = null;
        LocalDateTime endDateTime = null;
        double lowerPrice = -1;
        double upperPrice = -1;
        List<Event> events = null;

        if (hasSearch) {
            events = findBySearch(search);
        }
        else {
            events = findAll();
        }
        if (hasPrices) {
            try {
                lowerPrice = Double.parseDouble(lowerPriceS);
                upperPrice = Double.parseDouble(upperPriceS);
            }
            catch (Exception e) {
                throw new InvalidSearchException("Invalid price bounds");
            }
        }
        if (hasDates) {
            try {
                startDateTime = LocalDateTime.parse(startDateTimeS, formatter);
                endDateTime = LocalDateTime.parse(endDateTimeS, formatter);
            }
            catch (Exception e) {
                throw new InvalidSearchException("Invalid date format");
            }
        }

        if (hasPrices || hasDates) {
            final double innerLowerPrice = lowerPrice;
            final double innerUpperPrice = upperPrice;
            final LocalDateTime innerStartDateTime = startDateTime;
            final LocalDateTime innerEndDateTime = endDateTime;
            rtrn = events.stream().filter(event -> {
                if (innerLowerPrice != -1) {
                    if (event.getTicket_price() < innerLowerPrice || event.getTicket_price() > innerUpperPrice) {
                        return false;
                    }
                }
                if (innerStartDateTime != null) {
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
        }

        return rtrn;
    }

}
