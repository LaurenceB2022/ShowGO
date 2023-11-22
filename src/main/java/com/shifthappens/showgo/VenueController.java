package com.shifthappens.showgo;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidPasswordException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.repositories.VenueRepository;

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class VenueController {
    
    private final VenueRepository venueRepo;

    public VenueController(VenueRepository venueRepo) {
        this.venueRepo = venueRepo;
    }

    @GetMapping("/venues")
    private List<Venue> findAll() {
        List<Venue> venues = new ArrayList<Venue>();
        venueRepo.findAll().forEach(venue -> venues.add(venue));
        return venues;
    }

    @PostMapping("/venues")
    public Venue signUp(@RequestBody Venue venue) {
        System.out.println("*****IM SIGNING SOMEONE UP*******");
        if (!isValidUsername(venue.getUsername())) {
            throw new InvalidUsernameException();
        }
        if (!isValidPassword(venue.getPassword())) {
            throw new InvalidPasswordException();
        }
        return venueRepo.save(venue);

    }

    @PostMapping("/venues/settings")
    public Venue editSettings(@RequestBody Venue venue) {
        System.out.println("*****IM SIGNING SOMEONE UP*******");
        if (venueRepo.findByUsername(venue.getUsername()) == null) {
            throw new InvalidUsernameException();
        }
        if (!isValidPassword(venue.getPassword())) {
            throw new InvalidPasswordException();
        }
        return venueRepo.save(venue);
    }

    @DeleteMapping("/venues/{username}")
    public void deleteVenue(@PathVariable String username) {
        venueRepo.delete(venueRepo.findByUsername(username));
    }

    @GetMapping("/venues/{username}")
    public Venue findVenue(@PathVariable String username) {
        Venue venue = venueRepo.findByUsername(username);
        if (venue == null) {
            throw new InvalidUsernameException();
        }
        return venue;
    }

    public boolean isValidPassword(String password) {
        if (password.length() >= 8) {
            Pattern letter = Pattern.compile("[A-Z]");
            Pattern special = Pattern.compile ("[!@#$%&*()_+=|<>?{}\\[\\]~-]");
            Matcher hasLetter = letter.matcher(password);
            Matcher hasSpecial = special.matcher(password);

            return hasLetter.find() && hasSpecial.find();
        }
        else {
            return false;
        }
    }

    public boolean isValidUsername(String username) {
        return (username != null &&
                !username.isBlank() &&
                !username.contains(" ") && 
                venueRepo.findByUsername(username) == null && 
                username.length() <= 20) ;
    }

}
