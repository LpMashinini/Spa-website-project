FROM eclipse-temurin:21-jre-jammy

RUN apt-get update \
    && apt-get upgrade -y \
    && rm -rf /var/lib/apt/lists/* \

WORKDIR /app

RUN useradd --system --create-home appuser

COPY target/*.jar app.jar

RUN chown appuser:appuser app.jar

USER appuser

EXPOSE 8080

ENTRYPOINT ["java", "-jar", "app.jar"]