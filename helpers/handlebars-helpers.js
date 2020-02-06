const moment=require('moment');

module.exports={
    
    GenerateDate: function(date,format)
    {
        return moment(date).format(format);
    }
};