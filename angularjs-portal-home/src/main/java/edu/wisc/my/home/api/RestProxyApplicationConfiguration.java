package edu.wisc.my.home.api;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.context.annotation.PropertySource;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;
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

}
