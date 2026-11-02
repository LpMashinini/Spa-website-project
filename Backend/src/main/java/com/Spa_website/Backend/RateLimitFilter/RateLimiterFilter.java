package com.Spa_website.Backend.RateLimitFilter;

import com.Spa_website.Backend.config.RateLimitConfig;
import io.github.bucket4j.Bucket;
import jakarta.servlet.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@RequiredArgsConstructor
@Component
public class RateLimiterFilter extends OncePerRequestFilter {

    private final RateLimitConfig rateLimitConfig;


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {

        String ipAddress = request.getRemoteAddr();

        Bucket bucket = rateLimitConfig.resolveBucket(ipAddress);

        if (bucket.tryConsume(1)){

            response.setHeader("X-Rate-Limit-Limit", "5");
            response.setHeader(
                    "X-Rate-Limit-Remaining",
                    String.valueOf(bucket.getAvailableTokens())
            );

            filterChain.doFilter(request,response);

        } else {
            response.setStatus(429);

            response.setContentType("application/json");

            response.getWriter().write(
                    "{\"status\":429,\"error\":\"Too many requests. Please try again later.\"}"
            );
        }

    }
}
