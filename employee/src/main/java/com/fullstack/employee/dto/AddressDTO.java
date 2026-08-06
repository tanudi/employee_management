package com.fullstack.employee.dto;

import lombok.Data;

@Data
public class AddressDTO {
     String street;
     String city;
     String country;

    AddressDTO(AddressBuilder addressBuilder) {
        this.street = addressBuilder.street;
        this.city = addressBuilder.city;
        this.country = addressBuilder.country;
    }

    public static class AddressBuilder {
         String street;
         String city;
         String country;

         public AddressBuilder setStreet(String street) {
            this.street = street;
            return this;
         }

         public AddressBuilder setCity(String city) {
            this.city = city;
            return this;
         }

         public AddressBuilder setCountry(String country) {
            this.country = country;
            return this;
         }

         public AddressDTO build() {
            return new AddressDTO(this);
         }
    }
}
