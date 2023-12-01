package com.shifthappens.showgo;

import java.util.ArrayList;
import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shifthappens.showgo.entities.BlockedUser;
import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.entities.Venue;
import com.shifthappens.showgo.exceptions.InvalidUsernameException;
import com.shifthappens.showgo.repositories.BlockedUserRepository;
import com.shifthappens.showgo.repositories.UserRepository;
import com.shifthappens.showgo.repositories.VenueRepository;

/*
 * BlockedUserController file is what we used to store and move the data storage in our mvc app
 * this controller releys information and date in between the mvc application. 
 */

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BlockedUserController {
    //fields in the BlockedUserController class
    private final BlockedUserRepository blockedUserRepo;
    private final UserRepository userRepo;
    private final VenueRepository venueRepo;
    // BlockedUserController constructor that takes a BlockedUserRepository, UserRepository, and VenueRepository parameters
    public BlockedUserController(BlockedUserRepository blockedUserRepo, UserRepository userRepo, VenueRepository venueRepo) {
        this.blockedUserRepo = blockedUserRepo;
        this.userRepo = userRepo;
        this.venueRepo = venueRepo;
    }
    //finds all the blockedusers in the db and puts them in a list
    @GetMapping("/blockedUsers")
    private List<BlockedUser> findAll() {
        List<BlockedUser> blockedUsers = new ArrayList<BlockedUser>();
        blockedUserRepo.findAll().forEach(blockedUser -> blockedUsers.add(blockedUser));
        return blockedUsers;
    }
    //Finds blockuser by their user username and venue username. it checks if the blockuser user isnt null
    @PostMapping("/blockedUsers/{userUsername}/{venueUsername}")
    public BlockedUser blockUser(@PathVariable String userUsername, @PathVariable String venueUsername) {
        User user = userRepo.findByUsername(userUsername);
        Venue venue = venueRepo.findByUsername(venueUsername);

        if (user == null || venue == null) {
            throw new InvalidUsernameException();
        }
        if (blockedUserRepo.findByUserAndVenue(userUsername, venueUsername) != null) {
            throw new InvalidUsernameException();
        }

        return blockedUserRepo.save(new BlockedUser(user, venue));

    }
    //Deletes the blockuser by finding them by user username and venue username
    @DeleteMapping("/blockedUsers/{userUsername}/{venueUsername}")
    public void deleteBlockedUser(@PathVariable String userUsername, @PathVariable String venueUsername) {
        BlockedUser blockedUser = blockedUserRepo.findByUserAndVenue(userUsername, venueUsername);
        if (blockedUser == null) {
            throw new InvalidUsernameException();
        }
        blockedUserRepo.delete(blockedUser);
    }
    //Gets and finds all the blockUsers by venue username 
    @GetMapping("/blockedUsers/venue/{username}")
    public List<BlockedUser> findBlockedUsersByVenue(@PathVariable String username) {
        List<BlockedUser> BlockedUser = blockedUserRepo.findByVenueUsername(username);
        if (BlockedUser == null) {
            throw new InvalidUsernameException();
        }
        return BlockedUser;
    }
    //Gets and finds all the blockedUsers by user username 
    @GetMapping("/blockedUsers/user/{username}")
    public List<BlockedUser> findBlockedUsersByUser(@PathVariable String username) {
        List<BlockedUser> BlockedUser = blockedUserRepo.findByUserUsername(username);
        if (BlockedUser == null) {
            throw new InvalidUsernameException();
        }
        return BlockedUser;
    }

}