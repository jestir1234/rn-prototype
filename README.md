GoReadyMade
=========

This ReactNative project will be used as a customer app on iOS and Android for GoReadyMade


Commit Flow
=========
We will use a reduced version of gitflow with a master branch, a development branch and feature branches. The master branch will always contain the latest released version marked with a release tag. The development branch represents the current state of development with the completed features. The development branch will only be merged back to master once a version is ready for release. From the development branch each developer will create their feature branches for the things they're currently working on. The feature branches naming convention is 'initials-of-the-developer/name-of-feature' (e.g. 'se/authentication'). Once a feature is completed, the developer rebases his branch to the current state of the development branch and resolves appearing conflicts. After the rebase he will push the branch to the remote and create a pull request for it. Then another developer will review the pull request and either request changes, which should then be fixed by the original developer, or approve the pull request and merge it back to the development branch. Rebasing should only be used before pushing a branch to remote. If the branch was already pushed to make sure that nobody else checked out the branch from remote before rebasing or else use merge instead.
