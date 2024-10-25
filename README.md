# gmail-hotkey


Chrome extension to define a shortcut key to insert a customizable text string into the gmail compose window. 

The code was written using Claude. Initial attemps with ChatGPT and Gemini failed. 

Here's the prompt I used:
```
Write a chrome extension so that I can define custom macros to type 
predefined text strings using a hot key, say CTRL-ALT-, . 
Use manifest version 3.
```

```
I get this error: "Invalid value for 'commands[1].default': Ctrl+Alt+1.
Could not load manifest."
```


```
When I do this in gmail compose, when it is used the first time, it copies my email  signature.

```

### How to install and use 

1. Go to `chrome://extensions`
1. On the upper right corner, activate `Developer mode`

   ![dev](img/dev.png)
1. On the upper left corner, click on `( Load unpacked )`, then click on the folder where you've put these files.
   ![load](img/load.png)
1. Go to `chrome://extensions/shortcuts`
1. In the `Activate the extension` window, press `[Alt]+[Shift]+[,]`
   ![activate](img/activate.png)
1. Go to gmail, open a compose window then press `[Alt]+[Shift]+[,]`
1. Define your macro and `[Save]`.

   ![define](img/define.png)
1. Go to the gmail compose window and press `[Ctrl]+[Shift]+[,]`
   ![example](img/example.png)


### Known bugs

1. Only tested in Linux. May not work in Windows.

1. Need to activate when you switch to a different machine.


