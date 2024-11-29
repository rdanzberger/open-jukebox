package codes.rickyd.jukebox.configuration;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.context.annotation.Configuration;

@Configuration
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class SpotifyAuthConfiguration {
    private String clientId;
    private String clientSecret;
    private String redirectUri;

}
