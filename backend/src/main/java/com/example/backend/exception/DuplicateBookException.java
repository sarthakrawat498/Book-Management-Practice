package com.example.backend.exception;

public class DuplicateBookException extends RuntimeException {
    public DuplicateBookException(String title) {
        super("A book with title '" + title + "' already exists");
    }
}
