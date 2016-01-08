function calculatePlayerMovement(playerData, player, season) {
    var playerEventPosition = {};                   // This is the hashmap (via an object) that we can return
    for (var i=0; i < playerData.length; i++) {
        var playerLadderData = new Object();
        var eventNumber = playerData.length - i;
        var eventPlayerPosition = new Array();
        var blah = playerData.length - i;
        var eventDetails = "event" + playerData[i]["eventId"];
        for (j=0; j < playerData[i][eventDetails].length; j++) {
            if (playerData[i][eventDetails][j].points > 0) {
                getUnsortedLadderForEvent(playerLadderData, playerData[i][eventDetails][j]);
            }
        }
        var sortedLadder = sortEventData(playerLadderData);
        for (k=0; k < sortedLadder.length; k++) {
            playerEventPosition[eventNumber + ":" + sortedLadder[k].name] = (k + 1);
        }
    }
    // get list of player positions for graph
    if (player != undefined) {
        var singlePlayer = new Array();
        var singlePlayerEventPosition = new Array();
        for (var playerPosition in playerEventPosition) {
            if (playerPosition.replace(/[0-9]:/,'').replace(/ /g,'').toLowerCase() == player.toLowerCase()) {
                singlePlayer.push(playerEventPosition[playerPosition]) ///this is in reverse order
            }
        }
        for (i=singlePlayer.length - 1; i >= 0; i --){
            singlePlayerEventPosition.push(singlePlayer[i]); // put into correct order ready for graphing
        }
        playerEventPosition.playerPosition =  singlePlayerEventPosition;
    }
     return playerEventPosition;
}

function getUnsortedLadderForEvent(playerLadderData, playerData) {
    player = new Object();
    player.name = playerData.name;
    player.played = playerData.played;
    player.won = playerData.won
    player.points = playerData.points

    playerLadderData[player.name] = player;

}

function sortEventData(playerLadderData) {

   // get array from map - then sort that
   var players = new Array();
   $.each(playerLadderData, function(index, player) {
       players.push(player);
   });

   players.sort(function(playerA, playerB) {
        a = playerA;
        b = playerB;
        if (a.points !== b.points) {
            return sortReturn(a.points, b.points);
        } else if (a.played !== b.played) {
                    return sortReturn(b.played, a.played);
        } else if (a.won !== b.won) {
            return sortReturn(a.won, b.won);
        } else if (a.average !== b.average) {
			return sortReturn(a.average, b.average);
		} else {
			return sortReturn(b.name, a.name);
        }
   });
   return players;
}

function sortReturn(compare1, compare2) {
    if (compare1 < compare2) {
        return 1
    }
    return -1
}

function stripWhiteSpace(name) {
    return name.replace(/ /g,'');
}
