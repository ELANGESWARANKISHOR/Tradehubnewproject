FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY target/order-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8094
ENTRYPOINT ["java","-jar","app.jar"]
