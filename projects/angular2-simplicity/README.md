# Angular2 Simplicity v2.0.3
### Component Library for Beginners

Welcome to Simplicity, the Angular2 Web Component Library!

This library was created to simplify the process of building
beautiful and functional web applications using Angular2.
Our components are designed to be easy to use, highly performant,
and accessible to all users, making it possible for developers
of any skill level to create engaging and effective user interfaces.
With a wide range of components to choose from, Simplicity
has everything you need to bring your web applications to life.
Whether you're starting from scratch or looking to add new
functionality to an existing project, Simplicity is here to help
you achieve your goals with ease.

Documentation: https://anjunar.github.io/angular2-simplicity

# Sonatype Nexus Repository Setup
https://help.sonatype.com/repomanager3/nexus-repository-administration/formats/npm-registry/npm-security
https://help.sonatype.com/repomanager3/installation-and-upgrades/run-as-a-service
```
npm config set registry http://{server}:8081/repository/{group}/
npm adduser --auth-type=legacy --registry=http://{server}:8081/repository/{private}/
```
```  
"publishConfig": {
  "registry": "http://{server}:8081/repository/{private}/"
}
```

