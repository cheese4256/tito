package com.tito.service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.tito.config.TitoApplication;
import com.tito.model.Role;
import com.tito.model.Sausage;

public class JwtService {
	String issuer;
	String secret;
	int expiresInSeconds;
	Sausage currentSausage;

	public JwtService() {
		this.issuer = "tito";
		String jwtIssuer = TitoApplication.properties.getProperty("jwt.issuer");
		if (jwtIssuer != null && !jwtIssuer.isEmpty()) {
			this.issuer = jwtIssuer;
		}

		this.secret = "fuentes";
		String jwtSecret = TitoApplication.properties.getProperty("jwt.secret");
		if (jwtSecret != null && !jwtSecret.isEmpty()) {
			this.secret = jwtSecret;
		}

		this.expiresInSeconds = 600;
		String jwtExpiresInSeconds = TitoApplication.properties.getProperty("jwt.expiresInSeconds");
		if (jwtExpiresInSeconds != null && !jwtExpiresInSeconds.isEmpty()) {
			try {
				this.expiresInSeconds = Integer.parseInt(jwtExpiresInSeconds);
			} catch (NumberFormatException e) {
				e.printStackTrace();
			}
		}
	}

	public String jwtSign(Sausage sausage) {
		String token = null;
		try {
			Calendar calendar = Calendar.getInstance(); // gets a calendar using the default time zone and locale.
			calendar.add(Calendar.SECOND, this.expiresInSeconds);

			ArrayList<String> roleNameList = new ArrayList<String>();
			List<Role> roles = sausage.getRoles();
			if (roles != null) {
				for (Role role : roles) {
					roleNameList.add(role.getName());
				}
			}
			String[] roleNames = new String[roleNameList.size()];

			token = JWT.create()
				.withIssuer(this.issuer)
				.withSubject(String.valueOf(sausage.getId()))
				// There are a variety of ways to create custom claims, each
				// taking a name, then a value of various types, including
				// arrays (see the example below for role names)
//				.withClaim(name, value)
				.withArrayClaim("roles", roleNameList.toArray(roleNames))
				.withExpiresAt(calendar.getTime())
				.sign(Algorithm.HMAC256(this.secret));

			this.currentSausage = sausage;

		} catch (JWTCreationException exception){
			// Invalid Signing configuration / Couldn't convert Claims.
			this.currentSausage = null;
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			this.currentSausage = null;
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			this.currentSausage = null;
		}
		return token;
	}

	public JWT jwtVerify(String token) {
		if (token == null) {
			return null;
		}
		String[] parts = token.split(" ");
		if (parts.length != 2) {
			return null;
		}
		try {
			JWTVerifier verifier = JWT.require(Algorithm.HMAC256(this.secret))
				.withIssuer(this.issuer)
				.build(); //Reusable verifier instance
			return (JWT) verifier.verify(parts[1]);
		} catch (JWTVerificationException exception){
			//Invalid signature/claims
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}

	public Sausage getCurrentSausage() {
		return this.currentSausage;
	}
}
