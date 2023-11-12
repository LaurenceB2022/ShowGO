package com.shifthappens.showgo;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.exceptions.InvalidPasswordException;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
public class LoginController {
    
    private final VenueController venueControl;
    private final UserController userControl;

    public LoginController(VenueController venueControl, UserController userControl){
        this.venueControl = venueControl;
        this.userControl = userControl;
    }

    @GetMapping("/login/{username}/{password}")
    public Object login(@PathVariable String username, @PathVariable String password){
        Venue v = null;
        User u = null;
        try {
            v = venueControl.findVenue(username);
            if(v.getPassword().equals(password))
                return v;
        } catch (Exception e) {
             try {
                u = userControl.findUser(username);
                if(u.getPassword().equals(password))
                    return u;
                } catch (Exception f) {
                    throw new InvalidUsernameException();
             }
        }
        return new InvalidPasswordException();
    }

}
