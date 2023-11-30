package com.shifthappens.showgo.exceptions;

//Thrown for any API call where a venue is created with invalid settings
public class InvalidVenueCreationException extends RuntimeException{
    public InvalidVenueCreationException(String msg) {
        super(msg);
    }
}
