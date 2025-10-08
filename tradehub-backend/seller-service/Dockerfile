FROM openjdk:21-jdk-slim

WORKDIR /app

COPY pom.xml .
RUN apt-get update && apt-get install -y maven
RUN mvn dependency:go-offline

COPY src ./src
RUN mvn clean package -DskipTests

EXPOSE 8092

ENTRYPOINT ["java","-jar","target/user-service-0.0.1-SNAPSHOT.jar"]
