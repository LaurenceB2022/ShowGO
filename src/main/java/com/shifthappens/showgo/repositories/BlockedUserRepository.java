package com.shifthappens.showgo.repositories;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.CrudRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.shifthappens.showgo.entities.BlockedUser;
import com.shifthappens.showgo.entities.User;
import com.shifthappens.showgo.entities.Venue;

import java.util.List;


@Repository
public interface BlockedUserRepository extends CrudRepository<BlockedUser, String>{
    List<BlockedUser> findByVenue(Venue venue);

    List<BlockedUser> findByUser(User user);

    @Query(value = "SELECT * FROM blocked_users u WHERE u.user_username = :user and u.venue_username = :venue",
            nativeQuery = true)
    BlockedUser findByUserAndVenue(@Param("user") String userUsername, @Param("venue") String venueUsername);

    @Query(value = "SELECT * FROM blocked_users u WHERE u.user_username = :user",
            nativeQuery = true)
    List<BlockedUser> findByUserUsername(@Param("user") String userUsername);

    @Query(value = "SELECT * FROM blocked_users u WHERE u.venue_username = :venue",
            nativeQuery = true)
    List<BlockedUser> findByVenueUsername(@Param("venue") String venueUsername);
}
