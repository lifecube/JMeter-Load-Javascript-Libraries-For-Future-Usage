(function(context){
	var _global;
	var _jsPath;

	var _reload = function() {
		for(var name in _global){
			if(this[name] === undefined){
				this[name] = _global[name];
			}
		}
	};

	var dump = function(object){
		log.info('\n\n-======### Start Dumping ###======-');
		for(var i in object){
			log.info('obj[' + i + '] = ' + object[i]);
		}
		log.info('-======### End Dumping ###======-');
	};

	var load = function(js/* or [js,...]*/) {
		if(js instanceof Array){
			for(var i = 0; i < js.length; i++){
				log.debug('------ load: '+ _jsPath + js[i] + '.js');
				_global.load(_jsPath + js[i] + '.js');
			}			
		}else{
			log.debug('------ load: '+ _jsPath + js + '.js');
			_global.load(_jsPath + js + '.js');
		}
		_reload.call(null);
	};

	var reload = function() {
		_reload.call(null);  
	};

	if(!_global){
		var shell = org.mozilla.javascript.tools.shell.Main;
		var params = ['-e',''];
		shell.exec(args);
		_global = shell.global;
		_jsPath = vars.get('jsPath');		
	}

	var utils = {
		dump: dump,
		load: load,
		reload: reload
	};
	vars.putObject("utils", utils);
})();