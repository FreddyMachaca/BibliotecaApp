package com.example.loginapp;

import androidx.appcompat.app.AppCompatActivity;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.TextView;

public class HomeActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_home);

        // Recupera el mensaje de bienvenida de la sesión
        String mensajeBienvenida = getIntent().getStringExtra("mensajeBienvenida");

        // Busca el TextView en el diseño de la actividad
        TextView welcomeTextView = findViewById(R.id.welcomeTextView);

        // Muestra el mensaje de bienvenida
        welcomeTextView.setText(mensajeBienvenida);

        // Busca el botón de volver en el diseño de la actividad
        Button backButton = findViewById(R.id.backButton);

        // Agrega un OnClickListener al botón para volver a MainActivity
        backButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent(HomeActivity.this, MainActivity.class);
                startActivity(intent);
                finish(); // Cierra la actividad actual
            }
        });
    }
}
