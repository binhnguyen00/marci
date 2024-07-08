package net.marci.http;

import lombok.extern.slf4j.Slf4j;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.CrossOrigin;

@Slf4j
@CrossOrigin(origins = "*")
@PreAuthorize("permitAll")
public abstract class BaseController {
}