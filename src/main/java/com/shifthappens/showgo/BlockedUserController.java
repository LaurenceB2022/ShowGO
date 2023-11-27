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

@CrossOrigin(origins = "http://localhost:3000")
@RestController
public class BlockedUserController {
    
    private final BlockedUserRepository blockedUserRepo;
    private final UserRepository userRepo;
    private final VenueRepository venueRepo;

    public BlockedUserController(BlockedUserRepository blockedUserRepo, UserRepository userRepo, VenueRepository venueRepo) {
        this.blockedUserRepo = blockedUserRepo;
        this.userRepo = userRepo;
        this.venueRepo = venueRepo;
    }

    @GetMapping("/blockedUsers")
    private List<BlockedUser> findAll() {
        List<BlockedUser> blockedUsers = new ArrayList<BlockedUser>();
        blockedUserRepo.findAll().forEach(blockedUser -> blockedUsers.add(blockedUser));
        return blockedUsers;
    }

    @PostMapping("/blockedUsers/{userUsername}/{venueUsername}")
    public BlockedUser blockUser(@PathVariable String userUsername, @PathVariable String venueUsername) {
        User user = userRepo.findByUsername(userUsername);
        Venue venue = venueRepo.findByUsername(venueUsername);

        if (user == null || venue == null) {
            throw new InvalidUsernameException();
        }

        return blockedUserRepo.save(new BlockedUser(user, venue));

    }

    @DeleteMapping("/blockedUsers/{userUsername}/{venueUsername}")
    public void deleteBlockedUser(@PathVariable String userUsername, @PathVariable String venueUsername) {
        blockedUserRepo.delete(blockedUserRepo.findByUserAndVenue(userUsername, venueUsername));
    }

    @GetMapping("/blockedUsers/venue/{username}")
    public List<BlockedUser> findBlockedUsersByVenue(@PathVariable String username) {
        List<BlockedUser> BlockedUser = blockedUserRepo.findByVenueUsername(username);
        if (BlockedUser == null) {
            throw new InvalidUsernameException();
        }
        return BlockedUser;
    }

    @GetMapping("/blockedUsers/user/{username}")
    public List<BlockedUser> findBlockedUsersByUser(@PathVariable String username) {
        List<BlockedUser> BlockedUser = blockedUserRepo.findByUserUsername(username);
        if (BlockedUser == null) {
            throw new InvalidUsernameException();
        }
        return BlockedUser;
    }

}