JMeter-Load-Javascript-Libraries-For-Future-Usage
=================================================

Sample for how to load javascript libraries in JMeter, and use them later. 

This approche can not work with JSR223 Elements.

Usage:
------
1. Load the utils.js at first by BSF Sampler
  > It require one parameter: `jsPath` in `vars`.
2. From other BSF Sampler, it is require to load the utils from `vars`.

    ```javascript
    //it have to be retrieved everytime from new Sampler
    var utils = vars.getObject('utils');
    ```
3. `load()` js files and add the functions into current context
  
    ```javascript
    //can load more than one file once.
    utils.load(['moment.min']);//or utils.load('moment.min');
    ```
4. `reload()` put the functions previously loaded into current context
  
    ```javascript
    utils.reload();
    ```

Check the example jmx file. Tested on JMeter 2.9

NOTE:
-----

I put [moment.js](http://momentjs.com/) in the js folder, just for example. 
