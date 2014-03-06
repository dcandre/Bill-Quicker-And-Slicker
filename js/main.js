var bqs = {};

$(function()
{
    bqs.guid = {
        s4: function()
        {
            return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
        },
        get: function()
        {
            return (this.s4() + this.s4() + "-" + this.s4() + "-4" + this.s4().substr(0,3) + "-" + this.s4() + "-" + this.s4() + this.s4() + this.s4()).toLowerCase();
        }
    };

    bqs.cookie = {
        "url": "http://billquick.intouchsol.com/wbFrmMain.aspx",
        get: function(name, callback)
        {
            var details = {
                "url": this["url"],
                "name": name
            };

            return chrome.cookies.get(details, callback);
        },
        set: function(name, value, callback)
        {
            var now = new Date();

            var details = {
                "url": this["url"],
                "name": name,
                "value": value,
                "expirationDate": Math.round(now.setFullYear(now.getFullYear() + 1).getTime()/1000)
            };

            chrome.cookies.set(details, callback);
        },
        remove: function(name, callback)
        {
            var details = {
                "url": this["url"],
                "name": name
            };

            chrome.cookies.remove(details, callback);
        }
    };

    Backbone.sync = function(method, model, options) 
    {
        var url = model.url();
        var modelJSONString = JSON.stringify(model);

        if(method == "create")
        {        
            if(_.isArray(url.match(/\/bqs\/models\/timecard\/project\//i)))
            {               
                //This is a Project Model
                bqs.cookie.set(model.id, modelJSONString, function(cookie){});
                model.parse(JSON.parse(modelJSONString));
            } 
        } 
        else if(method == "read")
        {
            if(_.isArray(url.match(/\/bqs\/models\/timecard\/project\//i)))
            {               
                //This is a Project Model
                model.parse(JSON.parse(bqs.cookie.get(model.id, function(cookie){})));
            }       
        }
        else if(method == "update")
        {        
            if(_.isArray(url.match(/\/bqs\/models\/timecard\/project\//i)))
            {               
                //This is a Project Model
                bqs.cookie.set(model.id, modelJSONString, function(cookie){});
                model.parse(JSON.parse(modelJSONString));
            } 
        }   
        else if(method == "delete")
        {        
            if(_.isArray(url.match(/\/bqs\/models\/timecard\/project\//i)))
            {               
                //This is a Project Model
                bqs.cookie.remove(model.id, function(cookie){});
                model.parse(JSON.parse(modelJSONString));
            } 
        } 
    };


    bqs.models = {};
    bqs.models.timecard = {};

    bqs.models.timecard.Project = Backbone.Model.extend({
        defaults: {
            "id": bqs.guid.get() + new Date().getTime(),
            "projectID": 0,
            "activityID": 0,
            "description": ""
        },
        url: function()
        {
            return "/bqs/models/timecard/project/";
        },
    });

    bqs.models.timecard.ProjectList = Backbone.Collection.extend({
        model: bqs.models.timecard.Project
    });


    bqs.main = {};

    bqs.main.currentProjectList = new bqs.models.timecard.ProjectList();

    bqs.main.savedProjectList = new bqs.models.timecard.ProjectList();

});
