FROM eclipse-temurin:21-jdk-jammy
WORKDIR /app
COPY target/product-service-0.0.1-SNAPSHOT.jar app.jar
EXPOSE 8093
ENTRYPOINT ["java","-jar","app.jar"]
