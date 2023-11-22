package com.shifthappens.showgo.exceptions;

public class InvalidGuidException extends RuntimeException {
    public InvalidGuidException() {
        super("Invalid guid");
    }
}
