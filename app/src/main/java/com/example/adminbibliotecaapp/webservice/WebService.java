package com.example.adminbibliotecaapp.webservice;

import retrofit2.Call;
import retrofit2.http.Body;
import retrofit2.http.POST;

public interface WebService {

    @POST("/adminlogin")
    Call<AdminUsuarioResponse> login(
            @Body DataAdminUsuario usuario
    );
}
