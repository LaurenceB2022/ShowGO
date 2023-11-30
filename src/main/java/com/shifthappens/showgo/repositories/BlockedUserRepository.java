package com.shifthappens.showgo.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.BlockedUser;
import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.entities.Venue;

import java.util.List;
/*
 * This BlockedUserRepository file is the repository that maps our database requests for our project
 */

@Repository
public interface BlockedUserRepository extends CrudRepository<BlockedUser, String>{
    List<BlockedUser> findByVenue(Venue venue);

    List<BlockedUser> findByUser(User user);
    //This Query gets the blocked users from the database where the user username and venue user name match a certain search criteria    
    @Query(value = "SELECT * FROM blocked_users u WHERE u.user_username = :user and u.venue_username = :venue",
            nativeQuery = true)
    BlockedUser findByUserAndVenue(@Param("user") String userUsername, @Param("venue") String venueUsername);
    //This Query gets the blocked users from the database where the user username match a certain search criteria    
    @Query(value = "SELECT * FROM blocked_users u WHERE u.user_username = :user",
            nativeQuery = true)
    List<BlockedUser> findByUserUsername(@Param("user") String userUsername);
    //This Query gets the blocked users from the database where the venue username match a certain search criteria    
    @Query(value = "SELECT * FROM blocked_users u WHERE u.venue_username = :venue",
            nativeQuery = true)
    List<BlockedUser> findByVenueUsername(@Param("venue") String venueUsername);
}
