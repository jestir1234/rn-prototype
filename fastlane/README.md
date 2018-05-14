fastlane documentation
================
# Installation

Make sure you have the latest version of the Xcode command line tools installed:

```
xcode-select --install
```

Install _fastlane_ using
```
[sudo] gem install fastlane -NV
```
or alternatively using `brew cask install fastlane`

# Available Actions
## iOS
### ios release_development_branch
```
fastlane ios release_development_branch
```
This lane releases IOS app for current development branch on HockeyApp
### ios build_development_branch
```
fastlane ios build_development_branch
```
This lane builds IOS app for current development branch

----

## Android
### android release_development_branch
```
fastlane android release_development_branch
```
This lane releases android app for current development branch on HockeyApp
### android build_development_branch
```
fastlane android build_development_branch
```
This lane builds android app for current development branch

----

This README.md is auto-generated and will be re-generated every time [fastlane](https://fastlane.tools) is run.
More information about fastlane can be found on [fastlane.tools](https://fastlane.tools).
The documentation of fastlane can be found on [docs.fastlane.tools](https://docs.fastlane.tools).
