package com.tinytrace;

import java.util.Arrays;

import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.Bean;
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

	//@Bean
	//public CommandLineRunner commandLineRunner(ApplicationContext ctx) {
	//	return args -> {
	//		System.out.println("Let's inspect the beans provided by Spring Boot:");
	//		String[] beanNames = ctx.getBeanDefinitionNames();
	//		Arrays.sort(beanNames);
	//		for (String beanName : beanNames) {
	//			System.out.println(beanName);
	//		}
	//	};
	//} 
}
