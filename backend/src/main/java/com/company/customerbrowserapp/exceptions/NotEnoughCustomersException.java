package com.company.customerbrowserapp.exceptions;

public class NotEnoughCustomersException extends Exception {
    public NotEnoughCustomersException(){
        System.out.println("Provided number of user is too low");
    }
}
