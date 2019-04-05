/*
  Creates reaction-based polls
 */
var timestamp=new Date().getTime();
    var date=new Date(timestamp).getDate();
    var month=new Date(timestamp).getMonth()+1;
    var year=new Date(timestamp).getFullYear();
    var original_date=date+'/'+month+'/'+year;
	var hours= new Date(timestamp).getHours();
	var minutes= new Date(timestamp).getMinutes();
	var time= hours+':'+minutes;

const createTimedMessage = require('./../modules/timedMessage');

module.exports = bot => bot.registerCommand('headcount', (msg, args) => {
  msg.delete();

  const title = args.join(' ');
  if (title) {
    msg.channel.createMessage({
      embed: {
        title: 'Head count started by:',
        description: title,
        footer: {
          text: original_date+' '+time,
        },
      },
    }).then((message) => {
      message.addReaction('👍');
      message.addReaction('👎');
    });
  } else {
    createTimedMessage(bot, msg.channel.id, {
      embed: {
        title: 'Create a poll',
        description: 'Provide a poll title',
        color: bot.selfConfig.errorColor,
      },
    });
  }
}, {
  description: 'Creates polls',
  fullDescription: 'Makes a poll with thumbs-up/down reactions',
  usage: '<title>',
});
