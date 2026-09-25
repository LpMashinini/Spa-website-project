package com.Spa_website.Backend.jwtAuth;

import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;

@Component
@RequiredArgsConstructor
public class JwtRequestFilter extends OncePerRequestFilter {

    private final UserDetailsService userDetailsService;
    private final JwtUtil jwtUtil;

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {


        final String requestTokenHeader =
                request.getHeader("Authorization");

        String username = null;
        String jwtToken = null;

        // Check whether the request contains a Bearer token
        if (requestTokenHeader != null
                && requestTokenHeader.startsWith("Bearer ")) {

            jwtToken = requestTokenHeader.substring(7).trim();

            // Check whether the token is empty
            if (!jwtToken.isBlank()) {

                try {
                    username = jwtUtil.extractUsername(jwtToken);

                } catch (ExpiredJwtException e) {

                    logger.warn("JWT token has expired");

                } catch (JwtException | IllegalArgumentException e) {

                    logger.warn("Invalid JWT token: {}");
                    logger.error(e.getMessage());
                }
            }
        }

        // Authenticate only when a username was successfully extracted
        if (username != null
                && SecurityContextHolder.getContext()
                .getAuthentication() == null) {

            try {
                UserDetails userDetails =
                        userDetailsService.loadUserByUsername(username);

                if (jwtUtil.validateToken(jwtToken, userDetails)) {

                    UsernamePasswordAuthenticationToken authenticationToken =
                            new UsernamePasswordAuthenticationToken(
                                    userDetails,
                                    null,
                                    userDetails.getAuthorities()
                            );

                    authenticationToken.setDetails(
                            new WebAuthenticationDetailsSource()
                                    .buildDetails(request)
                    );

                    SecurityContextHolder.getContext()
                            .setAuthentication(authenticationToken);
                }


            } catch (UsernameNotFoundException e) {
                // User in token no longer exists in the database.
                // Leave the SecurityContext unauthenticated and let the
                // authorization rules decide whether to allow the request.
                logger.warn("JWT references unknown user '" + username + "'; skipping authentication.");
            }
        }

        // Continue the request through the security filter chain
        filterChain.doFilter(request, response);
    }
}
