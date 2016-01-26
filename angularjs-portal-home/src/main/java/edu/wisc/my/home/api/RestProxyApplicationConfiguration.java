package edu.wisc.my.home.api;

import java.nio.charset.Charset;
import java.util.ArrayList;
import java.util.List;

import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
import org.springframework.http.MediaType;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;

import edu.wisc.my.restproxy.config.RestProxyConfiguration;


@Configuration
@PropertySource(value = "classpath:endpoint.properties")
@Import(RestProxyConfiguration.class)
@EnableWebMvc
public class RestProxyApplicationConfiguration {

    /**
     * This bean is required for {@link org.springframework.beans.factory.annotation.Value} annotations to be able to accept placeholders.
     *
     * @return a {@link PropertySourcesPlaceholderConfigurer}
     */
    @Bean
    public static PropertySourcesPlaceholderConfigurer propertyPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }

    /**
     * This bean adds in unsupported return types.   Necessary because even though
     * rest proxy accepts all types, there are still a few that are unsupported
     *  
     * @return a {@link RestTemplate}
     */
    @Bean
    public RestTemplate restTemplate(){
        RestTemplate restTemplate=new RestTemplate();
        List<HttpMessageConverter<?>> mc=restTemplate.getMessageConverters();
        MappingJackson2HttpMessageConverter json=new MappingJackson2HttpMessageConverter();
        List<MediaType> supportedMediaTypes=new ArrayList<MediaType>();
        supportedMediaTypes.add(new MediaType("text","javascript",Charset.forName("utf-8")));
        supportedMediaTypes.add(new MediaType("application", "javascript", Charset.forName("UTF-8")));
        json.setSupportedMediaTypes(supportedMediaTypes);
        mc.add(json);
        restTemplate.setMessageConverters(mc);
        return restTemplate;
    }

}
