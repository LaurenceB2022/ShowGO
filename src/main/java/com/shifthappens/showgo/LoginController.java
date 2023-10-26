package com.shifthappens.showgo;

import java.util.ArrayList;
import java.util.List;

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

@RestController
public class LoginController {
    
    private final VenueController venueControl;
    //private final UserController userControl;

    public LoginController(VenueController venueControl) { //add UserController userControl
        this.venueControl = venueControl;
        //this.userControl = userControl
    }

    @PostMapping("/login")
    public Object login(String username, String password){
        if(venueControl.findVenue(username, password) != null){
            return venueControl.findVenue(username, password);
        }
        /* else if(userControl.findUser(username, password) != null){
            return userControl.findUser(username, password);
        } */
        return null;
    }

}
