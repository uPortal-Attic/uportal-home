package edu.wisc.my.home.dao;

import java.util.Map;

import org.springframework.http.HttpMethod;

public interface GenericRestLookupDao {

  public Object getStuffWithAuth(String uri, String username, String password, HttpMethod method,Map<String, String> attributes);
  
  public Object getStuff(String uri, Map<String, String> attributes);
}
