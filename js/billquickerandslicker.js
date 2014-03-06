var bqs = {};
bqs.TimeCard = {};

bqs.TimeCard.Project = function(data)
{
    var self = this;

    self.id = (null != data && "undefined" != typeof data["id"] && null != data["id"]) ? data["id"] : null;
    self.activityID = (null != data && "undefined" != typeof data["activityID"] && null != data["activityID"]) ? data["activityID"] : null;
    self.description = (null != data && "undefined" != typeof data["description"] && null != data["description"]) ? data["description"] : null;
};

bqs.TimeCard.ProjectCollection = function(data)
{
    var self = this;

    self.data = (null != data && "undefined" != typeof data["data"] && null != data["data"]) ? data["data"] : new Array();
    self.date = (null != data && "undefined" != typeof data["date"] && null != data["date"]) ? data["date"] : new Date();
};


