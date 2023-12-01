package com.shifthappens.showgo.exceptions;

//Thrown for any API call that uses an invalid guid as a parameter
public class InvalidGuidException extends RuntimeException {
    public InvalidGuidException() {
        super("Invalid guid");
    }
}
