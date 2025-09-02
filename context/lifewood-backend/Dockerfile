# =========================================================================
# Stage 1: The Builder - Build the Spring Boot application using Maven
# =========================================================================
FROM maven:3.9-eclipse-temurin-17 AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Maven project file first to leverage Docker layer caching.
# Dependencies are only re-downloaded if pom.xml changes.
COPY pom.xml .

# Download all project dependencies
RUN mvn dependency:go-offline

# Copy the rest of the source code
COPY src ./src

# Build the application, creating the executable .jar file
# The -DskipTests flag speeds up the build process in CI/CD environments
RUN mvn package -DskipTests

# =========================================================================
# Stage 2: The Runner - Create the final, lightweight image
# =========================================================================
FROM eclipse-temurin:17-jre-jammy

# Set the working directory
WORKDIR /app

# Create a non-root user for better security
RUN groupadd -r appgroup && useradd -r -g appgroup appuser
USER appuser

# Copy the .jar file built in the 'builder' stage into this new image
COPY --from=builder /app/target/lifewood-backend-0.0.1-SNAPSHOT.jar ./app.jar

# Expose the port that the application will run on
EXPOSE 8080

# The command to run the application when the container starts
# The environment variables (like DB_URL) set in Render will be available here
ENTRYPOINT ["java", "-jar", "app.jar"]