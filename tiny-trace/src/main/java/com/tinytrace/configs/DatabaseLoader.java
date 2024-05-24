package com.tinytrace.configs;

import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Component;

import lombok.AllArgsConstructor;

@Component
@AllArgsConstructor
public class DatabaseLoader implements CommandLineRunner {

    private final MongoTemplate mongoTemplate;

    @Override
    public void run(String... strings) throws Exception {
        mongoTemplate.getDb().drop();
    }

}
