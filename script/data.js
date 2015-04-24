var app=app||{};

app.data=(function(){
    function Data(baseUrl,ajaxRequest){
        this.users=new Users(baseUrl,ajaxRequest);
        this.songs=new Songs(baseUrl,ajaxRequest)
    }

    var cradentials=(function(){
        var headers={
            "X-Parse-Application-Id":"kzEIfMrBQhYADbSmJqYiJg6XHjGotOHL2nhmZfc0",
            "X-Parse-REST-API-Key":"5DLlGfP1j6RIrsmff7UFh8K8yOz6WM62g2lpIJei",
            "X-Parse-Session-Token":getSessionToken()


        }

        function getSessionToken(){
            localStorage.getItem('sessionToken')
        }

        function setSessionToken(sessionToken){
            localStorage.setItem('sessionToken',sessionToken)
        }

        function getUsername(sessionToken){
            localStorage.getItem('username')
        }

        function setUsername(sessionToken){
            localStorage.setItem('username',sessionToken)
        }


        function getHeaders(){
            return headers;
        }

        return{
            getSessionToken:getSessionToken,
            setSessionToken:setSessionToken,
            getUsername:getUsername,
            setUsername:setUsername,
            getHeaders:getHeaders


        }
    }())

    var Users=(function(argument){
        function Users(baseUrl,ajaxRequester){
            this._serviceUrl=baseUrl;
            this._ajaxRequester=ajaxRequester;
            this._headers=cradentials.getHeaders();
        }
        Users.prototype.login=function(username,password){
            var url=this._serviceUrl+'login?username='+username+'&password='+password;
            return this._ajaxRequester.get(url,this._headers)
                .then(function(data){
                    cradentials.setSessionToken(data.sessionToken)
                    cradentials.setUsername(data.username)
                    return data;
                })
        }

        Users.prototype.register=function(username,password){
            var user={
                username:username,
                password:password

            }

            var url=this._serviceUrl+'users';
            return this._ajaxRequester.post(url,user,this._headers)
                .then(function(data){
                    cradentials.setSessionToken(data.sessionToken)
                    return data;
                })
        }

        return Users;
    }())


    var Songs=(function(){
        function Songs(baseUrl,ajaxRequester){
            this._serviceUrl=baseUrl+'classes/Song';
            this._ajaxRequester=ajaxRequester;
            this._headers=cradentials.getHeaders();
        }

        Songs.prototype.getAll=function(){
            return this._ajaxRequester.get(this._serviceUrl,this._headers)
        }

        Songs.prototype.getById=function(objectId){
            return this._ajaxRequester.get(this._serviceUrl+'/'+objectId,this._headers)
        }

        Songs.prototype.add=function(song){
            return this._ajaxRequester.post(this._serviceUrl,song,this._headers)
        }

        Songs.prototype.edit=function(song,objectId){
            var url=this._serviceUrl+'/'+objectId;
            return this._ajaxRequester.put(url,song,this._headers)
        }

        Songs.prototype.delete=function(objectId){
            var url=this._serviceUrl+'/'+objectId;
            return this._ajaxRequester.delete(url,this._headers)
        }
        return Songs;

    }())

    return{
        get:function(baseUrl,ajaxRequester){
            return new Data(baseUrl,ajaxRequester)
        }
    }



}())
