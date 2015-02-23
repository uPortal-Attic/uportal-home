package edu.wisc.my.home.dao;

import java.util.Map;

import org.apache.commons.codec.binary.Base64;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.ObjectWriter;

@Repository
public class GenericRestLookupDaoImpl implements GenericRestLookupDao {
  
  protected Logger log = LoggerFactory.getLogger(this.getClass());

  public Object getStuff(String uri, 
                         Map<String, String> attributes) {
    RestTemplate restTemplate = new RestTemplate();
    
    Object response = restTemplate.getForObject(uri, Object.class, attributes);
    if(log.isTraceEnabled()) {
      ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
      String json;
      try {
        json = ow.writeValueAsString(response);
        log.trace("Response from uri: " + uri + " Response: " + json);
      } catch (JsonProcessingException e) {
        log.warn("Opps, couldn't parse JSON in trace mode.", e);
      }
      
    }
    
    return response;
  }
  
  public Object getStuffWithAuth(String uri, 
                                 String username, 
                                 String password,
                                 HttpMethod method,
                                 Map<String, String> attributes) {
      RestTemplate restTemplate = new RestTemplate();
      String creds = username + ":" + password;
      byte[] plainCredsBytes = creds.getBytes();
      byte[] base64CredsBytes = Base64.encodeBase64(plainCredsBytes);
      String base64Creds = new String(base64CredsBytes);
      
      HttpHeaders headers = new HttpHeaders();
      headers.add("Authorization", "Basic " + base64Creds);
      HttpEntity<String> request = new HttpEntity<String>(headers);
      
      ResponseEntity<Object> response = restTemplate.exchange(uri, method, request, Object.class, attributes);
      Object responseBody = response.getBody();
      return responseBody;
  }

}
