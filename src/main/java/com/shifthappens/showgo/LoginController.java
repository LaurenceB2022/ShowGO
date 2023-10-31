package com.shifthappens.showgo;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.exceptions.InvalidPasswordException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;

@RestController
public class LoginController {
    
    private final VenueController venueControl;
    private final UserController userControl;

    public LoginController(VenueController venueControl, UserController userControl){
        this.venueControl = venueControl;
        this.userControl = userControl;
    }

    @GetMapping("/login/{username}/{password}")
    public Object login(@PathVariable String username, @PathVariable String password){
        if(venueControl.findVenue(username) != null){
            Venue v = venueControl.findVenue(username);
            if(v.getPassword().equals(password))
                return v;
            else
                throw new InvalidPasswordException();
        }
        else if(userControl.findUser(username) != null){
            User u = userControl.findUser(username);
            if(u.getPassword().equals(password))
                return u;
            else
                throw new InvalidPasswordException();
        }
        throw new InvalidUsernameException();
    }

}
