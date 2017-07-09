(function (global) {
    // map tells the System loader where to look for things
    var map = {
        'app': 'app', // our application files
        '@angular': 'js/@angular', // angular2 packages
        'rxjs': 'js/rxjs', // Rxjs package
        'ng-scrollreveal': 'js/ng-scrollreveal.umd.js',  //Scroll reveal api
        'angular-froala-wysiwyg': 'js/angular-froala-wysiwyg.umd.js' // Froala text editor
    };

    // packages tells the System loader which filename and/or extensions to look for by default (when none are specified)
    var packages = {
        'app': { main: 'main.js', defaultExtension: 'js' },
        'rxjs': { defaultExtension: 'js' }
    };

    var meta = {
        'js/scrollreveal.min.js': {format: 'amd'}
    }

    // configure @angular packages
    var ngPackageNames = [
      'common',
      'compiler',
      'core',
      'http',
      'platform-browser',
      'platform-browser-dynamic',
      'upgrade',
      'forms',
      'router'
    ];

    function packIndex(pkgName) {
        packages['@angular/' + pkgName] = { main: 'index.js', defaultExtension: 'js' };
    }

    function packUmd(pkgName) {
        packages['@angular/' + pkgName] = { main: '/bundles/' + pkgName + '.umd.js', defaultExtension: 'js' };
    };

    var setPackageConfig = System.packageWithIndex ? packIndex : packUmd;
    ngPackageNames.forEach(setPackageConfig);
    var config = {
        map: map,
        packages: packages,
        meta: meta
    }
    System.config(config);
})(this);
