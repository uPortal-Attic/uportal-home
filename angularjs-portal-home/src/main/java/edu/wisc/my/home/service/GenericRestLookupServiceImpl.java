package edu.wisc.my.home.service;

import java.util.Map;

import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.HttpMethod;
import org.springframework.stereotype.Service;

import edu.wisc.my.home.dao.GenericRestLookupDao;

@Service
public class GenericRestLookupServiceImpl implements GenericRestLookupService {
  
  @Autowired
  private Environment env;
  
  @Autowired
  private GenericRestLookupDao grld;

  public Object getStuff(String key, Map<String, String> attributes) {
    String uri = env.getProperty(key + ".uri");
    String username = env.getProperty(key + ".username");
    String password = env.getProperty(key + ".password");
    String method = env.getProperty(key + ".method");
    
    if(StringUtils.isNotBlank(username)) {
      return grld.getStuffWithAuth(uri, username, password, getMethod(method), attributes);
    } else {
      return grld.getStuff(uri, attributes);
    }
  }
  
  private HttpMethod getMethod(String method) {
    return StringUtils.isNotBlank(method) ? HttpMethod.valueOf(method.toUpperCase()) : HttpMethod.GET;
  }

}
