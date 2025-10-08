# Use official OpenJDK 21 image
FROM eclipse-temurin:21-jdk-jammy

# Set working directory inside container
WORKDIR /app

# Copy the built jar file
COPY target/user-service-0.0.1-SNAPSHOT.jar app.jar

# Expose the port your service uses
EXPOSE 8092

# Run the jar
ENTRYPOINT ["java", "-jar", "app.jar"]

