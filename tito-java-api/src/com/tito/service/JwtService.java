package com.tito.service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.Calendar;

import com.auth0.jwt.JWT;
import com.auth0.jwt.JWTVerifier;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.tito.model.Role;
import com.tito.model.Sausage;

public class JwtService {
	String issuer;
	String secret;
//	String algorithm;
	int expiresInSeconds;

	public JwtService() {
// TODO: Use a real secret, issuer, etc
// TODO: Get config values for issuer, secret, algorithm, expires
		this.issuer = "tito";
		this.secret = "fuentes";
//		this.algorithm = Algorithm.HMAC256;
		this.expiresInSeconds = 600;
	}

	public String jwtSign(Sausage sausage) {
		String token = null;
		try {
			Calendar calendar = Calendar.getInstance(); // gets a calendar using the default time zone and locale.
			calendar.add(Calendar.SECOND, this.expiresInSeconds);

			ArrayList<String> roleNameList = new ArrayList<String>();
			for (Role role : sausage.getRoles()) {
				roleNameList.add(role.getName());
			}
			String[] roleNames = new String[roleNameList.size()];

			token = JWT.create()
				.withIssuer(this.issuer)
				.withSubject(sausage.getId())
				.withArrayClaim("roles", roleNameList.toArray(roleNames))
				.withExpiresAt(calendar.getTime())
// TODO: There are a variety of ways to create custom claims, each taking a name, then a value of various types, including arrays (could maybe use for role names?)
//				.withClaim(name, value)
				.sign(Algorithm.HMAC256(this.secret));

		} catch (JWTCreationException exception){
			// Invalid Signing configuration / Couldn't convert Claims.
		} catch (IllegalArgumentException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
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
}
