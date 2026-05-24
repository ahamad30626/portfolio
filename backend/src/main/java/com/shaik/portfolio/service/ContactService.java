package com.shaik.portfolio.service;

import com.shaik.portfolio.model.ContactMessage;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.concurrent.atomic.AtomicLong;

@Service
public class ContactService {

    private static final Logger log = LoggerFactory.getLogger(ContactService.class);
    private final List<ContactMessage> messages = new ArrayList<>();
    private final AtomicLong idCounter = new AtomicLong(1);

    public ContactMessage save(ContactMessage message) {
        message.setId(idCounter.getAndIncrement());
        message.setReceivedAt(LocalDateTime.now());
        messages.add(message);

        log.info("📬 New contact message received:");
        log.info("  From   : {} <{}>", message.getName(), message.getEmail());
        log.info("  Subject: {}", message.getSubject());
        log.info("  Message: {}", message.getMessage());

        return message;
    }

    public List<ContactMessage> getAllMessages() {
        return Collections.unmodifiableList(messages);
    }
}
