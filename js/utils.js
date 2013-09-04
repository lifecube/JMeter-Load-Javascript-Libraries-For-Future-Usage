var utils = {
	_global: false,
	_jsPath: '',
	dump: function(object){
		log.info('\n\n-======### Start Dumping ###======-');
		for(var i in object){
			log.info('obj[' + i + '] = ' + object[i]);
		}
		log.info('-======### End Dumping ###======-');
	},
	load: function(js/*or [js,js...]*/, context) {
		utils._init();
		if(js instanceof Array){
			for(var i = 0; i < js.length; i++){
				log.debug('------ load: '+ utils._jsPath + js[i] + '.js');
				utils._global.load(utils._jsPath + js[i] + '.js');
			}			
		}else{
			log.debug('------ load: '+ utils._jsPath + js + '.js');
			utils._global.load(utils._jsPath + js + '.js');
		}
		utils.reload(context);
	},
	reload: function(context) {
		for(var name in utils._global){
			if(context[name] === undefined){
				context[name] = utils._global[name];
			}
		}
	},
	_init: function() {
		if(!utils._global){
			var shell = org.mozilla.javascript.tools.shell.Main;
			var args = ['-e',''];
			shell.exec(args);
			utils._global = shell.global;
			utils._jsPath = vars.get('jsPath');		
		}
	}
};
vars.putObject("utils", utils);