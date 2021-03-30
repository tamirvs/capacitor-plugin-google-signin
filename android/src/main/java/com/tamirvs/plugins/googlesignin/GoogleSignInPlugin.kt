package com.tamirvs.plugins.googlesignin

import android.content.Intent
import android.util.Log
import androidx.activity.result.ActivityResult
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.ActivityCallback
import com.getcapacitor.annotation.CapacitorPlugin
import com.google.android.gms.auth.api.signin.GoogleSignIn
import com.google.android.gms.auth.api.signin.GoogleSignInAccount
import com.google.android.gms.auth.api.signin.GoogleSignInClient
import com.google.android.gms.auth.api.signin.GoogleSignInOptions
import com.google.android.gms.common.api.ApiException
import com.google.android.gms.tasks.OnCompleteListener
import com.google.android.gms.tasks.Task


@CapacitorPlugin(name = "GoogleSignIn")
class GoogleSignInPlugin : Plugin() {
    private var googleSignInClient: GoogleSignInClient? = null

    override fun load() {
        val pluginConfig = config
        val clientId = pluginConfig.configJSON.getString("clientId")
        val gso: GoogleSignInOptions = GoogleSignInOptions.Builder(GoogleSignInOptions.DEFAULT_SIGN_IN)
                .requestIdToken(clientId)
                .requestEmail()
                .build()

        googleSignInClient = GoogleSignIn.getClient(this.context, gso)
    }

    @PluginMethod
    fun signIn(call: PluginCall) {
        val intent: Intent? = googleSignInClient?.signInIntent
        startActivityForResult(call, intent, "googleSignInResult")
    }

    @PluginMethod
    fun signOut(call: PluginCall) {
        googleSignInClient?.signOut()
                ?.addOnCompleteListener(this.activity, OnCompleteListener<Void> {
                    call.resolve()
                })
    }

    @ActivityCallback
    fun googleSignInResult(call: PluginCall, result: ActivityResult) {
        val task: Task<GoogleSignInAccount> = GoogleSignIn.getSignedInAccountFromIntent(result.data)

        try {
            val account: GoogleSignInAccount? = task.getResult(ApiException::class.java)

            if (account !== null) {
                val user = JSObject()
                user.put("id", account.id)
                user.put("email", account.email)
                user.put("idToken", account.idToken)
                call.resolve(user)
            }
        } catch (e: ApiException) {
            Log.e("google.signin", e.statusCode.toString())
            call.reject("Something went wrong", e)
        }
    }

    @PluginMethod
    fun echo(call: PluginCall) {
//        val value = call.getString("value")
//        val ret = JSObject()
//        ret.put("value", value)
//        call.resolve(ret)
        val pluginConfig = config
        val clientId = pluginConfig.configJSON.get("clientId")
        val ret = JSObject()
        ret.put("foo", clientId)
        call.resolve(ret)
    }
}