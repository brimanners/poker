
  console.log('hello there ')

  if ('windowsSpeechRecognition' in window) {
                     var recognition = new webkitSpeechRecognition();
                     recognition.continuous = true;
                     recognition.lan = 'en-AU';
                     console.log('Listening now..........')

                     listening = false;
                     recognition.onresult = function(event) {
                       console.log('event ', event)
                       console.log(new Date().toString(), ' ', event.results[event.results.length - 1][0].transcript)

                       let stringToCheck = event.results[event.results.length - 1][0].transcript.toString().trim().toLowerCase();

                       console.log('String ', stringToCheck + ' listening ?', listening)

                       if (stringToCheck == "hey poker") {
                          const synth = window.speechSynthesis;
                          const utterThis = new SpeechSynthesisUtterance("Yes. What do you want");
                          synth.speak(utterThis);
                          listening = true;
                          console.log('listening ?', listening);
                          setTimeout(function(){ listening = false;
                                                 console.log('listening ?', listening);
                                               }, 6000);
                       }

                       stringToCheck = stringToCheck.replace('hey poker', '');
                       console.log('Reviewing string ', stringToCheck + ' listening ?', listening)

                        if ( (stringToCheck == "where is the next game" || stringToCheck == "where's the next game")  && listening) {
                           const synth = window.speechSynthesis;
                           let eventDate = document.querySelectorAll('.event .event-date')[0].text
                           let eventLocation = document.querySelectorAll('.event .event-location')[0].text

                           const utterThis = new SpeechSynthesisUtterance("Grab some beers, and go to " + eventLocation + " on the " + eventDate);
                           synth.speak(utterThis);
                       }

                       if ((stringToCheck == "how long until the next game" || stringToCheck == "how long til the next game") && listening) {

                            const synth = window.speechSynthesis;
                            const utterThis = new SpeechSynthesisUtterance('Thank you for asking. Shuffling up an dealing in,' + countdown(targetDate).toString());
                            synth.speak(utterThis);
                       }

                       if ((stringToCheck == "who's winning" || stringToCheck == "who's first") && listening) {

                            const synth = window.speechSynthesis;
                            let topPlayer = document.querySelectorAll('.seasonLadderRow .player-name')[0].text;
                            let topPoints = document.querySelectorAll('.seasonLadderRow .player-points')[0].getAttribute("data-points");

                            const utterThis = new SpeechSynthesisUtterance('It looks like ' + topPlayer + ' is the top dog at the moment with ' + topPoints + ' points ');
                            synth.speak(utterThis);
                       }

                        if (stringToCheck == "who's last" && listening) {

                           const synth = window.speechSynthesis;
                           let lastPlayerPos = document.querySelectorAll('.seasonLadderRow .player-name').length - 1;
                           let lastPlayer =  document.querySelectorAll('.seasonLadderRow .player-name')[lastPlayerPos].text;
                           let lastPlayerPoints =  document.querySelectorAll('.seasonLadderRow .player-points')[lastPlayerPos].getAttribute("data-points");


                           const utterThis = new SpeechSynthesisUtterance('It looks like ' + lastPlayer + ",  better pull his socks up. He's only got a pawltry, " + lastPlayerPoints + ', point ');
                           synth.speak(utterThis);
                      }



                       if (stringToCheck == 'i love you') {
                          const synth = window.speechSynthesis;
                          const utterThis = new SpeechSynthesisUtterance("I love you too. In a platonic way");
                          synth.speak(utterThis);
                        }

                        event = null;
                     }
                     recognition.start();
                 } else {
                    console.log('no speaky time')
                 }