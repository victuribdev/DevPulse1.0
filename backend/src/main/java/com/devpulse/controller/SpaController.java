package com.devpulse.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
public class SpaController {
    @RequestMapping(value = {"/{path:[^\\.]*}", "/**/{path:[^\\.]*}"})
    public String redirect() {
        // Retorna o index.html para qualquer rota que não seja arquivo estático ou API
        return "forward:/index.html";
    }
} 