/* eslint-disable  func-names */
/* eslint quote-props: ["error", "consistent"]*/

'use strict';

const Alexa = require('alexa-sdk');
const APP_ID = "amzn1.ask.skill.8bbc7aee-9c22-4475-9309-7048aebc8090";

const SKILL_NAME = 'Relax me';
const GET_FACT_MESSAGE = "Slowly, follow my instructions. ";
const HELP_MESSAGE = 'You can say alexa open relax me, or, you can say exit... What can I help you with?';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const relax_1 = `
Now take a few moments to do the thinking you need to do before you sleep. Focus now on anything you need or want to think about before you go to sleep. For the next two minutes, do any worrying or thinking you decide to do. Now it is time to clear your mind for sleep. There is nothing else you need to be doing at this moment. Nothing you need to be thinking, except calm, relaxed thoughts.

Notice how your body feels right now.

Where in your body is today's tension stored? Focus your attention on the part of your body that feels most tense. Focus in on one small area of tension. Breathe in deeply, and then let that tension go as your breathe out with a sigh.

Notice where your body feels most relaxed. Let that feeling of relaxation grow with each breath. Spreading further and further the feeling of relaxation.

Feel your attention drifting as you become sleepy and calm. For the next few moments, you can choose to focus on counting, and become more relaxed as each number passes through your mind. Concentrate your attention on the number one.

As you count from one to ten, you will become more deeply relaxed. As you relax, you can allow your mind to drift into pleasant, refreshing sleep.

Count slowly with me... 1.... focusing on the number 1.....

2... you are more deeply relaxed.... deeper and deeper... calm. Peaceful.

3... feel the tension leaving your body... relaxation filling your body and mind. Concentrating just on the numbers.

Picture in your mind number 4. very relaxed. Calm.... tingly feeling of relaxation in your arms and legs.... very heavy... pleasantly heavy and relaxed.

Concentrating on number 5... as you drift deeper... deeper. Calm. Sleep washing over you. Peaceful.

6....deeply relaxed....

7.... your body and mind are very calm...

8... so very pleasant and heavy....

9...allowing your mind to drift...easily...no direction... floating....relaxing...

10... you are deeply relaxed....

Now you may count back down from 10 to 1. When you reach 1, you will be fully relaxed and drift into deep sleep. When I say start, slowly count on your own while I continue to talk.

Focus only on the numbers while I describe the relaxation experience. Start now at 10.... and very slowly focus on 9... and keep going on your own....

...as you become deeply relaxed... warm... heavy... peaceful...comfortable...

sleep relaxation...

pleasant and calm...

drifting...

drifting...

accepting...

sleep relaxation...

feeling very good and peaceful...

at peace with yourself...

confident...

nurturing...

refreshing sleep...

sleep relaxation...

deeply relaxed...

sleep deeply...

calm and relaxed...

quiet...

sleep relaxation...

smooth, even breathing...

warm and calm...

relaxed...

peaceful...

relaxed...

sleep relaxation...

allowing yourself to drift into deep sleep...

deep pleasant sleep relaxation ...

sleep... `;

const relax_2 = `Find a comfortable sleeping position. You can change positions if needed, but try not to move around very much.

Take a deep breath in, pause... and breathe out.

Wherever your body is tense, focus on relaxing the muscles.

Feel your shoulders relax and sink into the bed.

Allow your jaw to drop slightly.

Wiggle your toes once or twice and feel your feet and legs relaxing.

Gently open and close your hands once... and again... and then relax your hands and arms.

Take a deep breath in, feeling the tension in your chest and stomach as you hold that breath...

And allow your chest and stomach to relax as the breath escapes slowly.

Notice any areas of tension in your body, and relax those areas now.

Your body will continue to relax...

The sleep countdown will start in a moment. Each number you count can allow you to feel more and more relaxed, and drift toward sleep.

Count very slowly, breathe with each count, and concentrate your mind on the numbers. As thoughts come up, you can disregard them and turn your attention back to the numbers.

Starting with 50, breathe in and silently count "50." Picture the number 50. Breathe out to the number 50.

Picture now the number 49. Breathe in. Noticing your eyelids. They might be feeling very heavy and comfortable. Exhale, counting 49.

48. See the number 48 in your mind’s eye. Focusing all your attention on 48.

47. You might be feeling more relaxed. Even sleepy. Concentrating on 47.

46. Pleasant and calm. Breathing slowly and deeply.

45. Your attention drifts slowly, randomly... you can focus back on the numbers

44. You might be feeling very sleepy now. Pleasantly drifting off into sleep...

43. Calm. Relaxed. Peaceful. Safe.

42. Focusing only on the numbers. Allowing other thoughts to slip away.

41. Deeply relaxed. Deeper and deeper. See the numbers in your mind, slowly counting down to sleep.

40. Continue the sleep countdown on your own now. Concentrating just on the numbers. Continue to count down now.

As your attention wanders, allow your mind to drift back to focus just on the numbers as you count down to sleep.

Pleasantly drifting...

No direction except for down deeper with each number you count.

Gently focus back on the counting as each number brings you closer and closer to sleep.

Calm. Relaxed.

Peaceful and relaxed.

Continue to count down, all the way down, down to zero... Down to sleep.`;

const data = [
    relax_1,
    relax_2
];

const handlers = {
    'LaunchRequest': function () {
        this.emit('GetNewRelaxInfoIntent');
    },
    'Unhandled': function() {
		this.emit(
			":ask",
			"Sorry I didnt understand that. Say help for assistance."
		);
	},
    'GetNewRelaxInfoIntent': function () {
        const factArr = data;
        const factIndex = Math.floor(Math.random() * factArr.length);
        const randomFact = factArr[factIndex];
        const speechOutput = "<emphasis level='moderate'>" + GET_FACT_MESSAGE + randomFact + "</emphasis>";

        this.response.cardRenderer(SKILL_NAME, randomFact);
        this.response.speak(speechOutput);
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
