package com.tinytrace;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.core.SpringVersion;

import io.github.cdimascio.dotenv.Dotenv;

@SpringBootApplication
public class TinyTraceApplication {

	public static void main(String[] args) {
		Dotenv dotenv = Dotenv.load(); 
		dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue())); 

		SpringApplication.run(TinyTraceApplication.class, args);
		System.out.printf("My Spring version is: %s\n", SpringVersion.getVersion());
	}
}
