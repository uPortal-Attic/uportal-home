package edu.wisc.my.home.api;

import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.PropertySource;
import org.springframework.core.env.Environment;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import edu.wisc.my.home.service.GenericRestLookupService;
import edu.wisc.my.home.util.KeyUtils;


@RestController
@PropertySource("classpath:/endpoint.properties")
public class GenericRestLookupController {
  
  protected Logger log = LoggerFactory.getLogger(this.getClass());
  
  @Autowired
  private GenericRestLookupService grls;
  
  @Autowired
  private Environment env;
  
  @RequestMapping("/{key}.json")
  public @ResponseBody Object getContactInfo(HttpServletRequest request, 
                                             HttpServletResponse response,
                                             @PathVariable String key) {
    if(StringUtils.isEmpty(key) || !env.containsProperty(key + ".uri")) {
      response.setStatus(HttpServletResponse.SC_NOT_FOUND);
      log.warn("A user tried dirty trick via api with key: " + key);
      return null; 
    } else {
      //get header attributes per key
      Map<String, String> attributes = KeyUtils.getHeaders(env, request, key);
      //call generic service that will do magic, return object
      return grls.getStuff(key, attributes);
    }
  }

}
