# Multi-Stage Dockerfile for Spring Boot Application

# --- Stage 1: Build JAR ---
FROM maven:3.9.6-eclipse-temurin-21-alpine AS builder
WORKDIR /app

# Copy pom.xml and download dependencies (cached layer)
COPY pom.xml .
RUN mvn dependency:go-offline -B

# Copy source code and build production jar package
COPY src ./src
RUN mvn package -DskipTests -B

# --- Stage 2: Runtime Container ---
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
USER appuser

# Copy executable jar from builder stage
COPY --from=builder /app/target/pulsecraft-backend-1.0.0.jar app.jar

# Expose Spring Boot port
EXPOSE 8080

# Healthcheck configuration for Docker container management
HEALTHCHECK --interval=30s --timeout=5s --start-period=40s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:8080/actuator/health || exit 1

# Launch Spring Boot JVM app
ENTRYPOINT ["java", "-XX:+UseG1GC", "-XX:MaxRAMPercentage=75.0", "-jar", "app.jar"]
