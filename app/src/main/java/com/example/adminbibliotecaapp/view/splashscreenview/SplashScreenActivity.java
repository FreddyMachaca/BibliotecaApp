package com.example.adminbibliotecaapp.view.splashscreenview;

import androidx.appcompat.app.AppCompatActivity;

import android.app.Activity;
import android.content.Intent;
import android.os.Bundle;
import android.os.Handler;
import android.view.Window;
import android.view.WindowManager;

import com.bumptech.glide.Glide;
import com.example.adminbibliotecaapp.R;
import com.example.adminbibliotecaapp.databinding.ActivitySplahScreenBinding;
import com.example.adminbibliotecaapp.utils.Utils;

public class SplashScreenActivity extends AppCompatActivity {

    private ActivitySplahScreenBinding binding;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_splah_screen);
        binding = ActivitySplahScreenBinding.inflate(getLayoutInflater());
        setContentView(binding.getRoot());

        getWindow().setFlags(WindowManager.LayoutParams.FLAG_FULLSCREEN, WindowManager.LayoutParams.FLAG_FULLSCREEN);

        Glide.with(this)
                .load(R.drawable.gif_libro)
                .centerInside()
                .into(binding.ivSplashScreen);
        cambiarPantalla();
    }

    private void cambiarPantalla() {
        new Handler().postDelayed(() -> {
            //Intent intent = new Intent(SplashScreenActivity.this, LoginScreenActivity.class);
            //startActivity(intent);
            //finish();
        }, new Utils().getDuracionSplashScreen());
    }
}