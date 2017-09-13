/**
 * Licensed to Apereo under one or more contributor license
 * agreements. See the NOTICE file distributed with this work
 * for additional information regarding copyright ownership.
 * Apereo licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file
 * except in compliance with the License.  You may obtain a
 * copy of the License at the following location:
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
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
