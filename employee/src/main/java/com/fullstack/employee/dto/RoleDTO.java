package com.fullstack.employee.dto;

import lombok.Data;

@Data
public class RoleDTO {
    String title;
    String level;
    RoleDTO(RoleBuilder builder) {
        this.title = builder.title;
        this.level = builder.level;
    }
    public static class RoleBuilder {
        String title;
        String level;
        
        public RoleBuilder setTitle(String title) {
            this.title = title;
            return this;
        }

        public RoleBuilder setLevel(String level) {
            this.level = level;
            return this;
        }

        public RoleDTO build() {
            return new RoleDTO(this);
        }
    }
}
