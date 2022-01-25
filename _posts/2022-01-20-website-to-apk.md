---
layout: post
title: Website to App
description: Convert any website into a simple Android app (APK)
tags : android java apkdev
---

<!-- <audio preload="auto" autoplay loop>
   <source src="https://dewanmukto.com/asset/audio/frlegendsost2.mp3" type="audio/mpeg" preload="auto" />
</audio> -->

## Overview
Sometimes, you wish to have a more convenient method of letting your audience/clients access your website. And for that, usually the answer is to "keep things memorable". Thus, what can be more memorable and always poking at your attention than having an app on the mobile device's screen - eager to teleport your visitors to any target website, anytime?

Here is a simplified process of what to do :


## Preparations
Rubbing your hands together, go ahead and download <a href="https://developer.android.com/studio" target="_blank">Android Studio</a> on your PC. Also, make sure you have Java installed, as well. Having both a JDK and a JRE is preferred.

I assume that you are already familiar with the basics of programming in atleast one of the following : Python, C, C++, C#, Java, JavaScript, Fortran, Rust, etc.

Once you are ready, launch the Android Studio software and select 'Empty Activity' (or whatever will be selected by default). Android Studio provides a suitable 'canvas' template for you to get started, so that you don't have to write up all the code from scratch!

Now, simply locate and paste the code snippets into the respective files (and remember to change the text in all capital letters! Except for the comments.) :

<br /><br />

### MainActivity.java 👇

Address : **app > src > main > java > com > YOURDEVELOPERNAME/BRAND > YOURAPPNAME > MainActivity.java**
```java
package com.YOURDEVELOPERNAME.YOURAPPNAME;

import androidx.appcompat.app.AppCompatActivity;
import android.webkit.WebSettings;
import android.webkit.WebView;
import android.webkit.WebViewClient;
import android.os.Bundle;

public class MainActivity extends AppCompatActivity {
    private WebView mainWebsite;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mainWebsite = (WebView) findViewById(R.id.webview);
        WebSettings webSettings= mainWebsite.getSettings();
        webSettings.setJavaScriptEnabled(true);
        mainWebsite.loadUrl("YOURTARGETWEBSITELINK");
        mainWebsite.setWebViewClient(new WebViewClient());
    }

    // Allowing the 'back' activity to take you back a page rather than exiting the app
    @Override
    public void onBackPressed() {
        if(mainWebsite.canGoBack())
        {
            mainWebsite.goBack();
        }

        else
        {
            super.onBackPressed();
        }
    }

}
```

<br /><br />

### activity_main.xml 👇

Address : **app > src > main > res > layout > activity_main.xml**
```xml
<?xml version="1.0" encoding="utf-8"?>
<RelativeLayout xmlns:android="http://schemas.android.com/apk/res/android"
    xmlns:tools="http://schemas.android.com/tools"
    android:id="@+id/activity_main"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    tools:context="com.YOURDEVNAME.YOURAPPNAME.MainActivity">

    // WebView Element
    <WebView
        android:id="@+id/webview"
        android:layout_width="match_parent"
        android:layout_height="match_parent" />
</RelativeLayout>
```

<br /><br />

### themes.xml 👇

Depending on your version and other factors, you may have more than 1 'themes.xml' file

Address : **app > src > main > res > values > themes.xml**

```xml
<resources xmlns:tools="http://schemas.android.com/tools">


    <!-- DEFAULT APP THEME BASE -->
    <style name="Theme.YOURAPPNAME" parent="Theme.MaterialComponents.DayNight.NoActionBar">
        
        <!-- REMEMBER TO CHANGE THE COLORS TO OTHER HEX VALUES OF YOUR CHOICE! -->

        <item name="colorPrimary">@color/purple_500</item>
        <item name="colorPrimaryVariant">@color/purple_700</item>
        <item name="colorOnPrimary">@color/white</item>

        <item name="colorSecondary">#8BC34A</item>
        <item name="colorSecondaryVariant">#4CAF50</item>
        <item name="colorOnSecondary">@color/black</item>

        <item name="android:statusBarColor" tools:targetApi="l">?attr/colorPrimaryVariant</item>

    </style>
</resources>
```

<br /><br />

### AndroidManifest.xml 👇

Address : **app > src > main > AndroidManifest.xml**

```xml
<?xml version="1.0" encoding="utf-8"?>
<manifest xmlns:android="http://schemas.android.com/apk/res/android"
    package="com.YOURDEVNAME.YOURAPPNAME">
    <uses-permission android:name="android.permission.INTERNET"></uses-permission>
    <application
        android:allowBackup="true"
        android:icon="@mipmap/ic_launcher"
        android:label="@string/app_name"
        android:roundIcon="@mipmap/ic_launcher_round"
        android:supportsRtl="true"
        android:theme="@style/Theme.YOURAPPNAME">
        <activity
            android:name=".MainActivity"
            android:exported="true">
            <intent-filter>
                <action android:name="android.intent.action.MAIN" />

                <category android:name="android.intent.category.LAUNCHER" />
            </intent-filter>
        </activity>
    </application>

</manifest>
```

<br /><br />

## Changing the icon

Lastly, before you export the APK, you should change the app's icon from the default 'placeholder' image that is pre-loaded as an asset in Android Studio. To do this, delete all the folders/files within **res > mipmap** and **res > drawable**. This is to ensure that all the previous preset images are removed properly.

Next, right-click on **res** (in the project viewer) and **new > image asset**. Locate the icon's image, select 'Trim : Yes' to resize and fit the image within the icon's boundaries. Finish.

## Exporting the APK

Now, this step will produce an 'unsigned' 'debug' version of the app - which is good enough for simple experiments and first-time developers. Nothing to worry about. On the menu bar, select **Build > Build bundle(s) / APK(s) > Build APK(s)** and wait for Gradle to do the magic. Once it is complete, you'll notice a notification in the bottom panels (if it is successfully built). Now, click on the 'locate' text from the "locate or analyze" statement. And you shall find your **app-dedug.apk**, which you can copy to another location and rename.

And that's it!

<br /><br />
<br /><br />
<br /><br />

###### adapted from <a href="https://abhiandroid.com/createandroidapp/webview-android-app" target="_blank">this blogsite</a>.
