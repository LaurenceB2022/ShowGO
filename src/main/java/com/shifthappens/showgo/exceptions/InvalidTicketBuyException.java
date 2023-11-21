package com.shifthappens.showgo.exceptions;

public class InvalidTicketBuyException extends RuntimeException{
    public InvalidTicketBuyException() {
        super("Event is already at maximum attendance");
    }
}