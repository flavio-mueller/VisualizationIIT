package ch.fhnw.iit.iitvisualization;

import android.content.Intent;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.util.Log;

import org.apache.cordova.ConfigXmlParser;
import org.apache.cordova.CordovaInterfaceImpl;
import org.apache.cordova.CordovaWebView;
import org.apache.cordova.CordovaWebViewImpl;
import org.apache.cordova.engine.SystemWebView;
import org.apache.cordova.engine.SystemWebViewEngine;
import org.json.JSONException;

public class MainActivity extends AppCompatActivity {

    private String TAG = "ComponentWrapper";
    private SystemWebView webView;
    private CordovaWebView webInterface;
    private CordovaInterfaceImpl stupidface = new CordovaInterfaceImpl(this);

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);

        //Set up the webview
        ConfigXmlParser parser = new ConfigXmlParser();
        parser.parse(this);

        webView = (SystemWebView) findViewById(R.id.WebViewComponent);
        webInterface = new CordovaWebViewImpl(new SystemWebViewEngine(webView));
        webInterface.init(stupidface, parser.getPluginEntries(), parser.getPreferences());
        webView.loadUrl(parser.getLaunchUrl());
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent intent) {
        super.onActivityResult(requestCode, resultCode, intent);
        stupidface.onActivityResult(requestCode, resultCode, intent);
    }

    @Override
    public void onDestroy() {
        webInterface.handleDestroy();
        super.onDestroy();
    }

    public void onRequestPermissionsResult(int requestCode, String permissions[],
                                           int[] grantResults) {
        try
        {
            stupidface.onRequestPermissionResult(requestCode, permissions, grantResults);
        }
        catch (JSONException e)
        {
            Log.d(TAG, "JSONException: Parameters fed into the method are not valid");
            e.printStackTrace();
        }

    }
}
