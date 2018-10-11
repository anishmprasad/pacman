
import * as variable from './variables'
import E from './prototype'

const { A,B,C,D ,a,e,g,i,l,m,n,o,p,q,r,s,v,w,y,z } = variable

console.log('n => ',n)

window.google = {};
google.dom = {};
google.pacManSound = true;
google.browser = {};
google.browser.engine = {}

var spriteURL = 'https://storage.googleapis.com/tfjs-examples/assets/webcam-transfer-learning/pacman-sprite.png';

google.dom.remove = function(a) {
    return a && a.parentNode && a.parentNode.removeChild(a)
};

google.dom.append = function(a) {
    return document.body.appendChild(a)
};

google.pacman ||
    function() {
        
        g.rand = function() {
            var b = 4294967296,
                c = 134775813;
            c = c * g.randSeed + 1;
            return (g.randSeed = c % b) / b
        };
        g.seed = function(b) {
            g.randSeed = b
        };
        g.getDistance = function(b, c) {
            // console.log('getDistance', Math.sqrt((c[1] - b[1]) * (c[1] - b[1]) + (c[0] - b[0]) * (c[0] - b[0])))
            return Math.sqrt((c[1] - b[1]) * (c[1] - b[1]) + (c[0] - b[0]) * (c[0] - b[0]))
        };
        g.getPlayfieldX = function(b) {
            return b + -32
        };
        g.getPlayfieldY = function(b) {
            return b + 0
        };
        g.getCorrectedSpritePos = function(b) {
            return b / 8 * 10 + 2
        };
        g.getDotElementId = function(b, c) {
            return "pcm-d" + b + "-" + c
        };
        g.showElementById = function(b, c) {
            var d = document.getElementById(b);
            if (d) d.style.visibility = c ? "visible" : "hidden"
        };
        g.getAbsoluteElPos = function(b) {
            var c = [0, 0];
            do {
                c[0] += b.offsetTop;
                c[1] += b.offsetLeft
            } while (b = b.offsetParent);
            return c
        };
        g.prepareElement = function(b, c, d) {
            c = g.getCorrectedSpritePos(parseInt(c, 10));
            d = g.getCorrectedSpritePos(parseInt(d, 10));
            if (g.useCss) {
                b.style.backgroundImage = "url(" + spriteURL + ")";
                b.style.backgroundPosition = -c + "px " + -d + "px";
                b.style.backgroundRepeat = "no-repeat"
            } else {
                b.style.overflow = "hidden";
                c = "display: block; position: relative; left: " + -c + "px; top: " + -d + "px";
                b.innerHTML = '<img style="' + c + '" src="' + spriteURL + '">'
            }
        };
        g.changeElementBkPos = function(b, c, d, f) {
            if (f) {
                c = g.getCorrectedSpritePos(c);
                d = g.getCorrectedSpritePos(d)
            }
            if (g.useCss) {
                b.style.backgroundPosition = -c + "px " + -d + "px";
            }
            else if (b.childNodes[0]) {
                b.childNodes[0].style.left = -c + "px";
                b.childNodes[0].style.top = -d + "px"
            }
        };
        g.determinePlayfieldDimensions = function() {
            g.playfieldWidth = 0;
            g.playfieldHeight = 0;
            for (var b in n) {
                var c = n[b];
                if (c.w) {
                    c = c.x + c.w - 1;
                    if (c > g.playfieldWidth) g.playfieldWidth = c
                } else {
                    c = c.y + c.h - 1;
                    if (c > g.playfieldHeight) g.playfieldHeight = c
                }
            }
        };
        g.preparePlayfield = function() {
            g.playfield = [];
            for (var b = 0; b <= g.playfieldHeight + 1; b++) {
                g.playfield[b * 8] = [];
                for (var c = -2; c <= g.playfieldWidth + 1; c++) g.playfield[b * 8][c * 8] = {
                    path: 0,
                    dot: 0,
                    intersection: 0
                }
            }
        };
        g.preparePaths = function() {
            console.log("preparePaths",n)
            for (var b in n) {
                var c = n[b],
                    d = c.type;
                if (c.w) {
                    for (var f = c.y * 8, h = c.x * 8; h <= (c.x + c.w - 1) * 8; h += 8) {
                        // console.log("g.playfield[f][h]", g.playfield[f][h]);
                        g.playfield[f][h].path = a;
                        if (g.playfield[f][h].dot == 0) {
                            g.playfield[f][h].dot = 1;
                            g.dotsRemaining++
                        }
                        g.playfield[f][h].type = !d || h != c.x * 8 && h != (c.x + c.w - 1) * 8 ? d : 0
                    }
                    g.playfield[f][c.x * 8].intersection = a;
                    g.playfield[f][(c.x + c.w - 1) * 8].intersection = a
                } else {
                    h = c.x * 8;
                    for (f = c.y * 8; f <= (c.y + c.h - 1) * 8; f += 8) {
                        if (g.playfield[f][h].path) g.playfield[f][h].intersection = a;
                        g.playfield[f][h].path = a;
                        if (g.playfield[f][h].dot == 0) {
                            g.playfield[f][h].dot = 1;
                            g.dotsRemaining++
                        }
                        g.playfield[f][h].type = !d || f != c.y * 8 && f != (c.y + c.h - 1) * 8 ? d : 0
                    }
                    g.playfield[c.y * 8][h].intersection = a;
                    g.playfield[(c.y + c.h - 1) * 8][h].intersection = a
                }
            }
            for (b in o)
                if (o[b].w)
                    for (h = o[b].x * 8; h <= (o[b].x + o[b].w - 1) * 8; h += 8) {
                        g.playfield[o[b].y * 8][h].dot = 0;
                        g.dotsRemaining--
                    } else
                        for (f = o[b].y * 8; f <= (o[b].y + o[b].h - 1) * 8; f += 8) {
                            g.playfield[f][o[b].x * 8].dot = 0;
                            g.dotsRemaining--
                        }
        };
        g.prepareAllowedDirections = function() {
            for (var b = 8; b <= g.playfieldHeight * 8; b += 8)
                for (var c = 8; c <= g.playfieldWidth * 8; c += 8) {
                    g.playfield[b][c].allowedDir = 0;
                    if (g.playfield[b - 8][c].path) g.playfield[b][c].allowedDir += 1;
                    if (g.playfield[b + 8][c].path) g.playfield[b][c].allowedDir += 2;
                    if (g.playfield[b][c - 8].path) g.playfield[b][c].allowedDir += 4;
                    if (g.playfield[b][c + 8].path) g.playfield[b][c].allowedDir += 8
                }
        };
        g.createDotElements = function() {
            for (var b = 8; b <= g.playfieldHeight * 8; b += 8)
                for (var c = 8; c <= g.playfieldWidth * 8; c += 8)
                    if (g.playfield[b][c].dot) {
                        var d = document.createElement("div");
                        d.className = "pcm-d";
                        d.id = g.getDotElementId(b, c);
                        d.style.left = c + -32 + "px";
                        d.style.top = b + 0 + "px";
                        g.playfieldEl.appendChild(d)
                    }
        };
        g.createEnergizerElements = function() {
            for (var b in p) {
                var c = p[b],
                    d = g.getDotElementId(c.y * 8, c.x * 8);
                document.getElementById(d).className = "pcm-e";
                g.prepareElement(document.getElementById(d), 0, 144);
                g.playfield[c.y * 8][c.x * 8].dot = 2
            }
        };
        g.createFruitElement = function() {
            g.fruitEl = document.createElement("div");
            g.fruitEl.id = "pcm-f";
            g.fruitEl.style.left = g.getPlayfieldX(v[1]) + "px";
            g.fruitEl.style.top = g.getPlayfieldY(v[0]) + "px";
            g.prepareElement(g.fruitEl, -32, -16);
            g.playfieldEl.appendChild(g.fruitEl)
        };
        g.createPlayfieldElements = function() {
            g.doorEl = document.createElement("div");
            g.doorEl.id = "pcm-do";
            g.doorEl.style.display = "none";
            g.playfieldEl.appendChild(g.doorEl);
            g.createDotElements();
            g.createEnergizerElements();
            g.createFruitElement()
        };
        g.createActors = function() {
            g.actors = [];
            for (var b = 0; b < g.playerCount + 4; b++) {
                g.actors[b] = new E(b);
                console.log('createActors',g.actors)
                if (b < g.playerCount) {
                    g.actors[b].ghost = e;
                    g.actors[b].mode = 1
                } else g.actors[b].ghost = a
            }
        };
        g.restartActors = function() {
            for (var b in g.actors){
              g.actors[b].A()
            }
        };
        g.createActorElements = function() {
            for (var b in g.actors){
              g.actors[b].createElement()
            }
            console.log('createActorElements',g.actors)
        };
        g.createPlayfield = function() {
            g.playfieldEl = document.createElement("div");
            g.playfieldEl.id = "pcm-p";
            g.canvasEl.appendChild(g.playfieldEl)
        };
        g.resetPlayfield = function() {
            g.dotsRemaining = 0;
            g.dotsEaten = 0;
            g.playfieldEl.innerHTML = "";
            g.prepareElement(g.playfieldEl, 256, 0);
            g.determinePlayfieldDimensions();
            g.preparePlayfield();
            g.preparePaths();
            g.prepareAllowedDirections();
            g.createPlayfieldElements();
            g.createActorElements()
        };
        g.keyPressed = function(b) {
            var c = e;
            switch (b) {
                case 37:
                    g.actors[0].requestedDir = 4;
                    c = a;
                    break;
                case 38:
                    g.actors[0].requestedDir = 1;
                    c = a;
                    break;
                case 39:
                    g.actors[0].requestedDir = 8;
                    c = a;
                    break;
                case 40:
                    g.actors[0].requestedDir = 2;
                    c = a;
                    break;
                case 65:
                    if (g.playerCount == 2) {
                        g.actors[1].requestedDir = 4;
                        c = a
                    }
                    break;
                case 83:
                    if (g.playerCount == 2) {
                        g.actors[1].requestedDir = 2;
                        c = a
                    }
                    break;
                case 68:
                    if (g.playerCount == 2) {
                        g.actors[1].requestedDir = 8;
                        c = a
                    }
                    break;
                case 87:
                    if (g.playerCount == 2) {
                        g.actors[1].requestedDir = 1;
                        c = a
                    }
                    break
            }
            return c
        };
        g.handleKeyDown = function(b) {
            if (!b) b = window.event;
            if (g.keyPressed(b.keyCode))
                if (b.preventDefault) b.preventDefault();
                else b.returnValue = e
        };
        g.canvasClicked = function(b, c) {
            var d = g.getAbsoluteElPos(g.canvasEl);
            b -= d[1] - -32;
            c -= d[0] - 0;
            d = g.actors[0];
            var f = g.getPlayfieldX(d.pos[1] + d.posDelta[1]) + 16,
                h = g.getPlayfieldY(d.pos[0] + d.posDelta[0]) + 32,
                j = Math.abs(b - f),
                k = Math.abs(c - h);
            if (j > 8 && k < j) d.requestedDir = b > f ? 8 : 4;
            else if (k > 8 && j < k) d.requestedDir = c > h ? 2 : 1
        };
        g.handleClick = function(b) {
            if (!b) b = window.event;
            g.canvasClicked(b.clientX, b.clientY)
        };
        g.registerTouch = function() {
            document.body.addEventListener("touchstart", g.handleTouchStart, a);
            g.canvasEl.addEventListener("touchstart", g.handleTouchStart, a);
            document.f && document.f.q && document.f.q.addEventListener("touchstart", g.handleTouchStart, a)
        };
        g.handleTouchStart = function(b) {
            g.touchDX = 0;
            g.touchDY = 0;
            if (b.touches.length == 1) {
                g.touchStartX = b.touches[0].pageX;
                g.touchStartY = b.touches[0].pageY;
                document.body.addEventListener("touchmove", g.handleTouchMove, a);
                document.body.addEventListener("touchend", g.handleTouchEnd, a)
            }
            b.preventDefault();
            b.stopPropagation()
        };
        g.handleTouchMove = function(b) {
            if (b.touches.length > 1) {
                g.cancelTouch();
            }
            else {
                g.touchDX = b.touches[0].pageX - g.touchStartX;
                g.touchDY = b.touches[0].pageY - g.touchStartY
            }
            b.preventDefault();
            b.stopPropagation()
        };
        g.handleTouchEnd = function(b) {
            if (g.touchDX == 0 && g.touchDY == 0) {
                g.canvasClicked(g.touchStartX, g.touchStartY);
            }
            else {
                var c = Math.abs(g.touchDX),
                    d = Math.abs(g.touchDY);
                if (c < 8 && d < 8) g.canvasClicked(g.touchStartX, g.touchStartY);
                else if (c > 15 && d < c * 2 / 3) g.actors[0].requestedDir = g.touchDX > 0 ? 8 : 4;
                else if (d > 15 && c < d * 2 / 3) g.actors[0].requestedDir = g.touchDY > 0 ? 2 : 1
            }
            b.preventDefault();
            b.stopPropagation();
            g.cancelTouch()
        };
        g.cancelTouch = function() {
            document.body.removeEventListener("touchmove", g.handleTouchMove, a);
            document.body.removeEventListener("touchend", g.handleTouchEnd, a);
            g.touchStartX = null;
            g.touchStartY = null
        };
        g.addEventListeners = function() {
            if (window.addEventListener) {
                window.addEventListener("keydown", g.handleKeyDown, e);
                g.canvasEl.addEventListener("click", g.handleClick, e);
                g.registerTouch()
            } else {
                document.body.attachEvent("onkeydown", g.handleKeyDown);
                g.canvasEl.attachEvent("onclick", g.handleClick)
            }
        };
        g.startGameplay = function() {
            g.score = [0, 0];
            g.extraLifeAwarded = [e, e];
            g.lives = 3;
            g.level = 0;
            g.paused = e;
            g.globalTime = 0;
            g.newLevel(a)
        };
        g.restartGameplay = function(b) {
            g.seed(0);
            g.frightModeTime = 0;
            g.intervalTime = 0;
            g.gameplayModeTime = 0;
            g.fruitTime = 0;
            g.ghostModeSwitchPos = 0;
            g.ghostModeTime = g.levels.ghostModeSwitchTimes[0] * D;
            g.ghostExitingPenNow = e;
            g.ghostEyesCount = 0;
            g.tilesChanged = e;
            g.updateCruiseElroySpeed();
            g.hideFruit();
            g.resetForcePenLeaveTime();
            g.restartActors();
            g.updateActorPositions();
            g.switchMainGhostMode(2, a);
            for (var c = g.playerCount + 1; c < g.playerCount + 4; c++){
              g.actors[c].a(16);
            }
            g.dotEatingChannel = [0, 0];
            g.dotEatingSoundPart = [1, 1];
            g.clearDotEatingNow();
            b ? g.changeGameplayMode(4) : g.changeGameplayMode(6)
        };
        g.initiateDoubleMode = function() {
            if (g.playerCount != 2) {
                g.stopAllAudio();
                g.changeGameplayMode(12)
            }
        };
        g.newGame = function() {
            g.playerCount = 1;
            g.createChrome();
            g.createPlayfield();
            g.createActors();
            // g.startGameplay()
        };
        g.switchToDoubleMode = function() {
            g.playerCount = 2;
            g.createChrome();
            g.createPlayfield();
            g.createActors();
            g.startGameplay()
        };
        g.insertCoin = function() {
            g.gameplayMode == 8 || g.gameplayMode == 14 ? g.newGame() : g.initiateDoubleMode()
        };
        g.createKillScreenElement = function(b, c, d, f, h) {
            var j = document.createElement("div");
            j.style.left = b + "px";
            j.style.top = c + "px";
            j.style.width = d + "px";
            j.style.height = f + "px";
            j.style.zIndex = 119;
            if (h) {
                j.style.background = "url(" + spriteURL + ") -" + g.killScreenTileX + "px -" + g.killScreenTileY + "px no-repeat";
                g.killScreenTileY += 8
            } else j.style.background = "black";
            g.playfieldEl.appendChild(j)
        };
        g.killScreen = function() {
            g.seed(0);
            g.canvasEl.style.visibility = "";
            g.createKillScreenElement(272, 0, 200, 80, e);
            g.createKillScreenElement(280, 80, 192, 56, e);
            g.killScreenTileX = 80;
            g.killScreenTileY = 0;
            for (var b = 280; b <= 472; b += 8)
                for (var c = 0; c <= 136; c += 8) {
                    if (g.rand() < 0.03) {
                        g.killScreenTileX = Math.floor(g.rand() * 25) * 10;
                        g.killScreenTileY = Math.floor(g.rand() * 2) * 10
                    }
                    g.createKillScreenElement(b, c, 8, 8, a)
                }
            g.changeGameplayMode(14)
        };
        g.newLevel = function(b) {
            g.level++;
            g.levels = g.level >= z.length ? z[z.length - 1] : z[g.level];
            // start issue 14: Ghosts stay blue permanently on restart
            if ((g.levels.frightTime > 0) && (g.levels.frightTime <= 6))
                g.levels.frightTime = Math.round(g.levels.frightTime * D);
            // end issue 14
            g.levels.frightTotalTime = g.levels.frightTime + g.timing[1] * (g.levels.frightBlinkCount * 2 - 1);
            for (var c in g.actors) g.actors[c].dotCount = 0;
            g.alternatePenLeavingScheme = e;
            g.lostLifeOnThisLevel = e;
            g.updateChrome();
            g.resetPlayfield();
            g.restartGameplay(b);
            g.level == 256 && g.killScreen()
        };
        g.newLife = function() {
            g.lostLifeOnThisLevel = a;
            g.alternatePenLeavingScheme = a;
            g.alternateDotCount = 0;
            g.lives--;
            g.updateChromeLives();
            g.lives == -1 ? g.changeGameplayMode(8) : g.restartGameplay(e)
        };
        g.switchMainGhostMode = function(b, c) {
            console.log("switchMainGhostMode",b,c);
            if (b == 4 && g.levels.frightTime == 0)
                for (var d in g.actors) {
                    var f = g.actors[d];
                    if (f.ghost) f.reverseDirectionsNext = a
                } else {
                    f = g.mainGhostMode;
                    if (b == 4 && g.mainGhostMode != 4) g.lastMainGhostMode = g.mainGhostMode;
                    g.mainGhostMode = b;
                    if (b == 4 || f == 4) g.playAmbientSound();
                    switch (b) {
                        case 1:
                        case 2:
                            g.currentPlayerSpeed = g.levels.playerSpeed * 0.8;
                            g.currentDotEatingSpeed = g.levels.dotEatingSpeed * 0.8;
                            break;
                        case 4:
                            g.currentPlayerSpeed = g.levels.playerFrightSpeed * 0.8;
                            g.currentDotEatingSpeed = g.levels.dotEatingFrightSpeed * 0.8;
                            g.frightModeTime = g.levels.frightTotalTime;
                            g.modeScoreMultiplier = 1;
                            break
                    }
                    for (d in g.actors) {
                        f = g.actors[d];
                        if (f.ghost) {
                            if (b != 64 && !c) f.modeChangedWhileInPen = a;
                            if (b == 4) f.eatenInThisFrightMode = e;
                            if (f.mode != 8 && f.mode != 16 && f.mode != 32 && f.mode != 128 && f.mode != 64 || c) {
                                if (!c && f.mode != 4 && f.mode != b) f.reverseDirectionsNext = a;
                                f.a(b)
                            }
                        } else {
                            f.fullSpeed = g.currentPlayerSpeed;
                            f.dotEatingSpeed = g.currentDotEatingSpeed;
                            f.tunnelSpeed = g.currentPlayerSpeed;
                            f.d()
                        }
                    }
                }
        };
        g.figureOutPenLeaving = function() {
            if (g.alternatePenLeavingScheme) {
                g.alternateDotCount++;
                switch (g.alternateDotCount) {
                    case m[1]:
                        g.actors[g.playerCount + 1].freeToLeavePen = a;
                        break;
                    case m[2]:
                        g.actors[g.playerCount + 2].freeToLeavePen = a;
                        break;
                    case m[3]:
                        if (g.actors[g.playerCount + 3].mode == 16) g.alternatePenLeavingScheme = e;
                        break
                }
            } else if (g.actors[g.playerCount + 1].mode == 16 || g.actors[g.playerCount + 1].mode == 8) {
                g.actors[g.playerCount + 1].dotCount++;
                if (g.actors[g.playerCount + 1].dotCount >= g.levels.penLeavingLimits[1]) g.actors[g.playerCount + 1].freeToLeavePen = a
            } else if (g.actors[g.playerCount + 2].mode == 16 || g.actors[g.playerCount + 2].mode == 8) {
                g.actors[g.playerCount + 2].dotCount++;
                if (g.actors[g.playerCount + 2].dotCount >= g.levels.penLeavingLimits[2]) g.actors[g.playerCount + 2].freeToLeavePen = a
            } else if (g.actors[g.playerCount + 3].mode == 16 || g.actors[g.playerCount + 3].mode == 8) {
                g.actors[g.playerCount + 3].dotCount++;
                if (g.actors[g.playerCount + 3].dotCount >= g.levels.penLeavingLimits[3]) g.actors[g.playerCount + 3].freeToLeavePen = a
            }
        };
        g.resetForcePenLeaveTime = function() {
            g.forcePenLeaveTime = g.levels.penForceTime * D
        };
        g.dotEaten = function(b, c) {
            console.log("dotEaten",b,c);
            g.dotsRemaining--;
            g.dotsEaten++;
            g.actors[b].c(1);
            g.playDotEatingSound(b);
            if (g.playfield[c[0]][c[1]].dot == 2) {
                g.switchMainGhostMode(4, e);
                g.addToScore(50, b)
            } else g.addToScore(10, b);
            var d = document.getElementById(g.getDotElementId(c[0], c[1]));
            d.style.display = "none";
            g.playfield[c[0]][c[1]].dot = 0;
            g.updateCruiseElroySpeed();
            g.resetForcePenLeaveTime();
            g.figureOutPenLeaving();
            if (g.dotsEaten == 70 || g.dotsEaten == 170) g.showFruit();
            g.dotsRemaining == 0 && g.finishLevel();
            g.playAmbientSound()
            console.log('dotEaten',g.dotsEaten,g.dotsRemaining)
        };
        g.getFruitSprite = function(b) {
            var c = b <= 4 ? 128 : 160;
            b = 128 + 16 * ((b - 1) % 4);
            return [c, b]
        };
        g.getFruitScoreSprite = function(b) {
            var c = 128;
            b = 16 * (b - 1);
            return [c, b]
        };
        g.hideFruit = function() {
            g.fruitShown = e;
            g.changeElementBkPos(g.fruitEl, 32, 16, a)
        };
        g.showFruit = function() {
            console.log("showFruit");
            g.fruitShown = a;
            var b = g.getFruitSprite(g.levels.fruit);
            g.changeElementBkPos(g.fruitEl, b[0], b[1], a);
            g.fruitTime = g.timing[15] + (g.timing[16] - g.timing[15]) * g.rand()
        };
        g.eatFruit = function(b) {
            console.log("eatFruit");            
            if (g.fruitShown) {
                g.playSound("fruit", 0);
                g.fruitShown = e;
                var c = g.getFruitScoreSprite(g.levels.fruit);
                g.changeElementBkPos(g.fruitEl, c[0], c[1], a);
                g.fruitTime = g.timing[14];
                g.addToScore(g.levels.fruitScore, b)
            }
        };
        g.updateActorTargetPositions = function() {
            for (var b = g.playerCount; b < g.playerCount + 4; b++){
                g.actors[b].B()
            }
        };
        g.moveActors = function() {
            for (var b in g.actors){
              g.actors[b].move()
            }
        };
        g.ghostDies = function(b, c) {
            g.playSound("eating-ghost", 0);
            g.addToScore(200 * g.modeScoreMultiplier, c);
            g.modeScoreMultiplier *= 2;
            g.ghostBeingEatenId = b;
            g.playerEatingGhostId = c;
            g.changeGameplayMode(1)
        };
        g.playerDies = function(b) {
            g.playerDyingId = b;
            g.changeGameplayMode(2)
        };
        g.detectCollisions = function() {
            g.tilesChanged = e;
            for (var b = g.playerCount; b < g.playerCount + 4; b++)
                for (var c = 0; c < g.playerCount; c++)
                    if (g.actors[b].tilePos[0] == g.actors[c].tilePos[0] && g.actors[b].tilePos[1] == g.actors[c].tilePos[1])
                        if (g.actors[b].mode == 4) {
                            g.ghostDies(b, c);
                            return
                        } else g.actors[b].mode != 8 && g.actors[b].mode != 16 && g.actors[b].mode != 32 && g.actors[b].mode != 128 && g.actors[b].mode != 64 && g.playerDies(c)
        };
        g.updateCruiseElroySpeed = function() {
            var b = g.levels.ghostSpeed * 0.8;
            if (!g.lostLifeOnThisLevel || g.actors[g.playerCount + 3].mode != 16) {
                var c = g.levels;
                if (g.dotsRemaining < c.elroyDotsLeftPart2) b = c.elroySpeedPart2 * 0.8;
                else if (g.dotsRemaining < c.elroyDotsLeftPart1) b = c.elroySpeedPart1 * 0.8
            }
            if (b != g.cruiseElroySpeed) {
                g.cruiseElroySpeed = b;
                g.actors[g.playerCount].d()
            }
        };
        g.getSpeedIntervals = function(b) {
            if (!g.speedIntervals[b]) {
                var c = 0,
                    d = 0;
                g.speedIntervals[b] = [];
                for (var f = 0; f < D; f++) {
                    c += b;
                    if (Math.floor(c) > d) {
                        g.speedIntervals[b].push(a);
                        d = Math.floor(c)
                    } else g.speedIntervals[b].push(e)
                }
            }
            return g.speedIntervals[b]
        };
        g.finishLevel = function() {
            g.changeGameplayMode(9)
        };
        g.changeGameplayMode = function(b) {
            g.gameplayMode = b;
            if (b != 13)
                for (var c = 0; c < g.playerCount + 4; c++) g.actors[c].b();
            switch (b) {
                case 0:
                    g.playAmbientSound();
                    break;
                case 2:
                    g.stopAllAudio();
                    g.gameplayModeTime = g.timing[3];
                    break;
                case 3:
                    g.playerDyingId == 0 ? g.playSound("death", 0) : g.playSound("death-double", 0);
                    g.gameplayModeTime = g.timing[4];
                    break;
                case 6:
                    g.canvasEl.style.visibility = "hidden";
                    g.gameplayModeTime = g.timing[5];
                    break;
                case 7:
                    g.stopAllAudio();
                    g.canvasEl.style.visibility = "";
                    g.doorEl.style.display = "block";
                    b = document.createElement("div");
                    b.id = "pcm-re";
                    g.prepareElement(b, 160, 0);
                    g.playfieldEl.appendChild(b);
                    g.gameplayModeTime = g.timing[6];
                    break;
                case 4:
                    g.doorEl.style.display = "block";
                    b = document.createElement("div");
                    b.id = "pcm-re";
                    g.prepareElement(b, 160, 0);
                    g.playfieldEl.appendChild(b);
                    g.gameplayModeTime = g.timing[7];
                    g.stopAllAudio();
                    g.playerCount == 2 ? g.playSound("start-music-double", 0, a) : g.playSound("start-music", 0, a);
                    break;
                case 5:
                    g.lives--;
                    g.updateChromeLives();
                    g.gameplayModeTime = g.timing[8];
                    break;
                case 8:
                case 14:
                    b = document.getElementById("pcm-re");
                    google.dom.remove(b);
                    g.stopAllAudio();
                    b = document.createElement("div");
                    b.id = "pcm-go";
                    g.prepareElement(b, 8, 152);
                    g.playfieldEl.appendChild(b);
                    g.gameplayModeTime = g.timing[9];
                    break;
                case 9:
                    g.stopAllAudio();
                    g.gameplayModeTime = g.timing[10];
                    break;
                case 10:
                    g.doorEl.style.display = "none";
                    g.gameplayModeTime = g.timing[11];
                    break;
                case 11:
                    g.canvasEl.style.visibility = "hidden";
                    g.gameplayModeTime = g.timing[12];
                    break;
                case 12:
                    g.playfieldEl.style.visibility = "hidden";
                    g.gameplayModeTime = g.timing[13];
                    break;
                case 1:
                    g.gameplayModeTime =
                        g.timing[2];
                    break;
                case 13:
                    g.startCutscene();
                    break
            }
        };
        g.showChrome = function(b) {
            g.showElementById("pcm-sc-1-l", b);
            g.showElementById("pcm-sc-2-l", b);
            g.showElementById("pcm-sc-1", b);
            g.showElementById("pcm-sc-2", b);
            g.showElementById("pcm-li", b);
            g.showElementById("pcm-so", b)
        };
        g.toggleSound = function(b) {
            b = window.event || b;
            b.cancelBubble = a;
            if (google.pacManSound) {
                g.userDisabledSound = a;
                g.stopAllAudio();
                google.pacManSound = e
            } else {
                google.pacManSound = a;
                g.playAmbientSound()
            }
            g.updateSoundIcon();
            return b.returnValue = e
        };
        g.updateSoundIcon = function() {
            if (g.soundEl) google.pacManSound ? g.changeElementBkPos(g.soundEl, 216, 105, e) : g.changeElementBkPos(g.soundEl, 236, 105, e)
        };
        g.startCutscene = function() {
            g.playfieldEl.style.visibility = "hidden";
            g.canvasEl.style.visibility = "";
            g.showChrome(e);
            g.cutsceneCanvasEl = document.createElement("div");
            g.cutsceneCanvasEl.id = "pcm-cc";
            g.canvasEl.appendChild(g.cutsceneCanvasEl);
            g.cutscene = B[g.cutsceneId];
            g.cutsceneSequenceId = -1;
            g.frightModeTime = g.levels.frightTotalTime;
            g.cutsceneActors = [];
            for (var b in g.cutscene.actors) {
                var c = g.cutscene.actors[b].id;
                if (c > 0) c += g.playerCount - 1;
                var d = document.createElement("div");
                d.className = "pcm-ac";
                d.id = "actor" + c;
                g.prepareElement(d, 0, 0);
                c = new E(c);
                c.el = d;
                c.elBackgroundPos = [0, 0];
                c.elPos = [0, 0];
                c.pos = [g.cutscene.actors[b].y * 8, g.cutscene.actors[b].x * 8];
                c.posDelta = [0, 0];
                c.ghost = g.cutscene.actors[b].ghost;
                g.cutsceneCanvasEl.appendChild(d);
                g.cutsceneActors.push(c)
            }
            g.cutsceneNextSequence();
            g.stopAllAudio();
            g.playAmbientSound()
        };
        g.stopCutscene = function() {
            g.playfieldEl.style.visibility = "";
            google.dom.remove(g.cutsceneCanvasEl);
            g.showChrome(a);
            g.newLevel(e)
        };
        g.cutsceneNextSequence = function() {
            g.cutsceneSequenceId++;
            if (g.cutscene.sequence.length == g.cutsceneSequenceId) g.stopCutscene();
            else {
                var b = g.cutscene.sequence[g.cutsceneSequenceId];
                g.cutsceneTime = b.time * D;
                for (var c in g.cutsceneActors) {
                    var d = g.cutsceneActors[c];
                    d.dir = b.moves[c].dir;
                    d.speed = b.moves[c].speed;
                    if (b.moves[c].elId) d.el.id = b.moves[c].elId;
                    if (b.moves[c].mode) d.mode = b.moves[c].mode;
                    d.b()
                }
            }
        };
        g.checkCutscene = function() {
            g.cutsceneTime <= 0 && g.cutsceneNextSequence()
        };
        g.advanceCutscene = function() {
            for (var b in g.cutsceneActors) {
                var c = g.cutsceneActors[b],
                    d = l[c.dir];
                c.pos[d.axis] += d.increment * c.speed;
                c.b()
            }
            g.cutsceneTime--
        };
        g.updateActorPositions = function() {
            for (var b in g.actors) {
                g.actors[b].k()
            }
        };
        g.blinkEnergizers = function() {
            switch (g.gameplayMode) {
                case 4:
                case 5:
                case 6:
                case 7:
                case 9:
                case 10:
                case 11:
                case 12:
                    g.playfieldEl.className = "";
                    break;
                case 8:
                case 14:
                    g.playfieldEl.className = "blk";
                    break;
                default:
                    if (g.globalTime % (g.timing[0] * 2) == 0) g.playfieldEl.className = "";
                    else if (g.globalTime % (g.timing[0] * 2) == g.timing[0]) g.playfieldEl.className = "blk";
                    break
            }
        };
        g.blinkScoreLabels = function() {
            if (g.gameplayMode != 13) {
                var b = "";
                if (g.globalTime % (g.timing[17] * 2) == 0) b = "visible";
                else if (g.globalTime % (g.timing[17] * 2) == g.timing[17]) b = "hidden";
                if (b)
                    for (var c = 0; c < g.playerCount; c++) g.scoreLabelEl[c].style.visibility = b
            }
        };
        g.finishFrightMode = function() {
            g.switchMainGhostMode(g.lastMainGhostMode, e)
        };
        g.handleGameplayModeTimer = function() {
            if (g.gameplayModeTime) {
                g.gameplayModeTime--;
                switch (g.gameplayMode) {
                    case 2:
                    case 3:
                        for (var b = 0; b < g.playerCount + 4; b++) g.actors[b].b();
                        break;
                    case 10:
                        Math.floor(g.gameplayModeTime / (g.timing[11] / 8)) % 2 == 0 ? g.changeElementBkPos(g.playfieldEl, 322, 2, e) : g.changeElementBkPos(g.playfieldEl, 322, 138, e)
                }
                if (g.gameplayModeTime <= 0) {
                    g.gameplayModeTime = 0;
                    switch (g.gameplayMode) {
                        case 1:
                            g.changeGameplayMode(0);
                            g.ghostEyesCount++;
                            g.playAmbientSound();
                            g.actors[g.ghostBeingEatenId].el.className = "pcm-ac";
                            g.actors[g.ghostBeingEatenId].a(8);
                            var c = e;
                            for (b = g.playerCount; b < g.playerCount + 4; b++)
                                if (g.actors[b].mode == 4 || (g.actors[b].mode == 16 || g.actors[b].mode == 128) && !g.actors[b].eatenInThisFrightMode) {
                                    c = a;
                                    break
                                }
                            c || g.finishFrightMode();
                            break;
                        case 2:
                            g.changeGameplayMode(3);
                            break;
                        case 3:
                            g.newLife();
                            break;
                        case 4:
                            g.changeGameplayMode(5);
                            break;
                        case 6:
                            g.changeGameplayMode(7);
                            break;
                        case 7:
                        case 5:
                            b = document.getElementById("pcm-re");
                            google.dom.remove(b);
                            g.changeGameplayMode(0);
                            break;
                        case 8:
                            b = document.getElementById("pcm-go");
                            google.dom.remove(b);
                            google.pacManQuery && google.pacManQuery();
                            break;
                        case 9:
                            g.changeGameplayMode(10);
                            break;
                        case 10:
                            g.changeGameplayMode(11);
                            break;
                        case 11:
                            if (g.levels.cutsceneId) {
                                g.cutsceneId = g.levels.cutsceneId;
                                g.changeGameplayMode(13)
                            } else {
                                g.canvasEl.style.visibility = "";
                                g.newLevel(e)
                            }
                            break;
                        case 12:
                            g.playfieldEl.style.visibility = "";
                            g.canvasEl.style.visibility = "";
                            g.switchToDoubleMode();
                            break
                    }
                }
            }
        };
        g.handleFruitTimer = function() {
            if (g.fruitTime) {
                g.fruitTime--;
                g.fruitTime <= 0 && g.hideFruit()
            }
        };
        g.handleGhostModeTimer = function() {
            if (g.frightModeTime) {
                g.frightModeTime--;
                if (g.frightModeTime <= 0) {
                    g.frightModeTime = 0;
                    g.finishFrightMode()
                }
            } else if (g.ghostModeTime > 0) {
                g.ghostModeTime--;
                if (g.ghostModeTime <= 0) {
                    g.ghostModeTime = 0;
                    g.ghostModeSwitchPos++;
                    if (g.levels.ghostModeSwitchTimes[g.ghostModeSwitchPos]) {
                        g.ghostModeTime = g.levels.ghostModeSwitchTimes[g.ghostModeSwitchPos] * D;
                        switch (g.mainGhostMode) {
                            case 2:
                                g.switchMainGhostMode(1, e);
                                break;
                            case 1:
                                g.switchMainGhostMode(2, e);
                                break
                        }
                    }
                }
            }
        };
        g.handleForcePenLeaveTimer = function() {
            if (g.forcePenLeaveTime) {
                g.forcePenLeaveTime--;
                if (g.forcePenLeaveTime <= 0) {
                    for (var b = 1; b <= 3; b++)
                        if (g.actors[g.playerCount + b].mode == 16) {
                            g.actors[g.playerCount + b].freeToLeavePen = a;
                            break
                        }
                    g.resetForcePenLeaveTime()
                }
            }
        };
        g.handleTimers = function() {
            if (g.gameplayMode == 0) {
                g.handleForcePenLeaveTimer();
                g.handleFruitTimer();
                g.handleGhostModeTimer()
            }
            g.handleGameplayModeTimer()
        };
        g.tick = function() {
            var b = (new Date).getTime();
            g.lastTimeDelta += b - g.lastTime - g.tickInterval;
            if (g.lastTimeDelta > 100) g.lastTimeDelta = 100;
            if (g.canDecreaseFps && g.lastTimeDelta > 50) {
                g.lastTimeSlownessCount++;
                g.lastTimeSlownessCount == 20 && g.decreaseFps()
            }
            var c = 0;
            if (g.lastTimeDelta > g.tickInterval) {
                c = Math.floor(g.lastTimeDelta / g.tickInterval);
                g.lastTimeDelta -= g.tickInterval * c
            }
            g.lastTime = b;
            if (g.gameplayMode == 13) {
                for (b = 0; b < g.tickMultiplier + c; b++) {
                    g.advanceCutscene();
                    g.intervalTime = (g.intervalTime + 1) % D;
                    g.globalTime++
                }
                g.checkCutscene();
                g.blinkScoreLabels()
            } else
                for (b = 0; b < g.tickMultiplier + c; b++) {
                    g.moveActors();
                    if (g.gameplayMode == 0)
                        if (g.tilesChanged) {
                            g.detectCollisions();
                            g.updateActorTargetPositions()
                        }
                    g.globalTime++;
                    g.intervalTime = (g.intervalTime + 1) % D;
                    g.blinkEnergizers();
                    g.blinkScoreLabels();
                    g.handleTimers()
                }
        };
        g.extraLife = function(b) {
            g.playSound("extra-life", 0);
            g.extraLifeAwarded[b] = a;
            g.lives++;
            if (g.lives > 5) g.lives = 5;
            g.updateChromeLives()
        };
        g.addToScore = function(b, c) {
            g.score[c] += b;
            !g.extraLifeAwarded[c] && g.score[c] > 1E4 && g.extraLife(c);
            g.updateChromeScore(c)
        };
        g.updateChrome = function() {
            g.updateChromeLevel();
            g.updateChromeLives();
            for (var b = 0; b < g.playerCount; b++) g.updateChromeScore(b)
        };
        g.updateChromeScore = function(b) {
            var c = g.score[b].toString();
            if (c.length > g.scoreDigits) c = c.substr(c.length - g.scoreDigits, g.scoreDigits);
            for (var d = 0; d < g.scoreDigits; d++) {
                var f = document.getElementById("pcm-sc-" + (b + 1) + "-" + d),
                    h = c.substr(d, 1);
                h ? g.changeElementBkPos(f, 8 + 8 * parseInt(h, 10), 144, a) : g.changeElementBkPos(f, 48, 0, a)
            }
        };
        g.updateChromeLives = function() {
            g.livesEl.innerHTML = "";
            for (var b = 0; b < g.lives; b++) {
                var c = document.createElement("div");
                c.className = "pcm-lif";
                g.prepareElement(c, 64, 129);
                g.livesEl.appendChild(c)
            }
        };
        g.updateChromeLevel = function() {
            g.levelEl.innerHTML = "";
            for (var b = g.level; b >= Math.max(g.level - 4 + 1, 1); b--) {
                var c = b >= z.length ? z[z.length - 1].fruit : z[b].fruit,
                    d = document.createElement("div");
                c = g.getFruitSprite(c);
                g.prepareElement(d, c[0], c[1]);
                g.levelEl.appendChild(d)
            }
            g.levelEl.style.marginTop = (4 - Math.min(g.level, 4)) * 16 + "px"
        };
        g.createChrome = function() {
            g.canvasEl.innerHTML = "";
            g.scoreDigits = g.playerCount == 1 ? 10 : 5;
            g.scoreLabelEl = [];
            g.scoreLabelEl[0] = document.createElement("div");
            g.scoreLabelEl[0].id = "pcm-sc-1-l";
            g.prepareElement(g.scoreLabelEl[0], 160, 56);
            g.canvasEl.appendChild(g.scoreLabelEl[0]);
            g.scoreEl = [];
            g.scoreEl[0] = document.createElement("div");
            g.scoreEl[0].id = "pcm-sc-1";
            for (var b = 0; b < g.scoreDigits; b++) {
                var c = document.createElement("div");
                c.id = "pcm-sc-1-" + b;
                c.style.top = b * 8 + "px";
                c.style.left = 0;
                c.style.position = "absolute";
                c.style.width = "8px";
                c.style.height = "8px";
                g.prepareElement(c, 48, 0);
                g.scoreEl[0].appendChild(c)
            }
            g.canvasEl.appendChild(g.scoreEl[0]);
            g.livesEl = document.createElement("div");
            g.livesEl.id = "pcm-li";
            g.canvasEl.appendChild(g.livesEl);
            g.levelEl = document.createElement("div");
            g.levelEl.id = "pcm-le";
            g.canvasEl.appendChild(g.levelEl);
            if (g.playerCount == 2) {
                g.scoreLabelEl[1] = document.createElement("div");
                g.scoreLabelEl[1].id = "pcm-sc-2-l";
                g.prepareElement(g.scoreLabelEl[1], 160, 64);
                g.canvasEl.appendChild(g.scoreLabelEl[1]);
                g.scoreEl[1] = document.createElement("div");
                g.scoreEl[1].id = "pcm-sc-2";
                for (b = 0; b < g.scoreDigits; b++) {
                    c = document.createElement("div");
                    c.id = "pcm-sc-2-" + b;
                    c.style.top = b * 8 + "px";
                    c.style.left = 0;
                    c.style.position = "absolute";
                    c.style.width = "8px";
                    c.style.height = "8px";
                    g.prepareElement(c, 48, 0);
                    g.scoreEl[1].appendChild(c)
                }
                g.canvasEl.appendChild(g.scoreEl[1])
            }
            if (g.soundAvailable) {
                g.soundEl = document.createElement("div");
                g.soundEl.id = "pcm-so";
                g.prepareElement(g.soundEl, -32, -16);
                g.canvasEl.appendChild(g.soundEl);
                g.soundEl.onclick =
                    g.toggleSound;
                g.updateSoundIcon()
            }
        };
        g.clearDotEatingNow = function() {
            g.dotEatingNow = [e, e];
            g.dotEatingNext = [e, e]
        };
        g.playSound = function(b, c, d) {
            if (!(!g.soundAvailable || !google.pacManSound || g.paused)) {
                d || g.stopSoundChannel(c);
                try {
                    g.flashSoundPlayer.playTrack(b, c)
                } catch (f) {
                    g.soundAvailable = e
                }
            }
        };
        g.stopSoundChannel = function(b) {
            if (g.soundAvailable) try {
                g.flashSoundPlayer.stopChannel(b)
            } catch (c) {
                g.soundAvailable = e
            }
        };
        g.stopAllAudio = function() {
            if (g.soundAvailable) {
                try {
                    g.flashSoundPlayer.stopAmbientTrack()
                } catch (b) {
                    g.soundAvailable = e
                }
                for (var c = 0; c < 5; c++) g.stopSoundChannel(c)
            }
        };
        g.playDotEatingSound = function(b) {
            if (g.soundAvailable && google.pacManSound)
                if (g.gameplayMode == 0)
                    if (g.dotEatingNow[b]) g.dotEatingNext[b] = a;
                    else {
                        if (b == 0) {
                            var c = g.dotEatingSoundPart[b] == 1 ? "eating-dot-1" : "eating-dot-2";
                            g.playSound(c, 1 + g.dotEatingChannel[b], a);
                            g.dotTimer = window.setInterval(g.repeatDotEatingSoundPacMan, 150)
                        } else {
                            g.playSound("eating-dot-double", 3 + g.dotEatingChannel[b], a);
                            g.dotTimerMs = window.setInterval(g.repeatDotEatingSoundMsPacMan, 150)
                        }
                        g.dotEatingChannel[b] = (g.dotEatingChannel[b] + 1) % 2;
                        g.dotEatingSoundPart[b] =
                            3 - g.dotEatingSoundPart[b]
                    }
        };
        g.repeatDotEatingSound = function(b) {
            g.dotEatingNow[b] = e;
            if (g.dotEatingNext[b]) {
                g.dotEatingNext[b] = e;
                g.playDotEatingSound(b)
            }
        };
        g.repeatDotEatingSoundPacMan = function() {
            g.repeatDotEatingSound(0)
        };
        g.repeatDotEatingSoundMsPacMan = function() {
            g.repeatDotEatingSound(1)
        };
        g.playAmbientSound = function() {
            if (g.soundAvailable && google.pacManSound) {
                var b = 0;
                if (g.gameplayMode == 0 || g.gameplayMode == 1) b = g.ghostEyesCount ? "ambient-eyes" : g.mainGhostMode == 4 ? "ambient-fright" : g.dotsEaten > 241 ? "ambient-4" : g.dotsEaten > 207 ? "ambient-3" : g.dotsEaten > 138 ? "ambient-2" : "ambient-1";
                else if (g.gameplayMode == 13) b = "cutscene";
                if (b) try {
                    g.flashSoundPlayer.playAmbientTrack(b)
                } catch (c) {
                    g.soundAvailable = e
                }
            }
        };
        g.initializeTickTimer = function() {
            window.clearInterval(g.tickTimer);
            g.fpsChoice = 2;
            g.fps = C[g.fpsChoice];
            g.tickInterval = 1E3 / g.fps;
            g.tickMultiplier = D / g.fps;
            g.timing = {};
            for (var b in w) {
                var c = !google.pacManSound && (b == 7 || b == 8) ? 1 : w[b];
                g.timing[b] = Math.round(c * D)
            }
            g.lastTime = (new Date).getTime();
            g.lastTimeDelta = 0;
            g.lastTimeSlownessCount = 0;
            g.tickTimer = window.setInterval(g.tick, g.tickInterval)
        };
        g.decreaseFps = function() {
            if (g.fpsChoice < C.length - 1) {
                g.fpsChoice++;
                g.initializeTickTimer();
                if (g.fpsChoice == C.length - 1) g.canDecreaseFps = e
            }
        };
        g.addCss = function() {
            var b = "#pcm-c {  width: 554px;  border-top: 25px solid black;  padding-bottom: 25px;  height: 136px;  position: relative; outline: 0;  overflow: hidden;  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);}#pcm-c * {  position: absolute;  overflow: hidden;}#pcm-p,#pcm-cc {  left: 45px;  width: 464px;  height: 136px;  z-index: 99;  overflow: hidden;}#pcm-p .pcm-d {  width: 2px;  height: 2px;  margin-left: 3px;  margin-top: 3px;  background: #f8b090;  z-index: 100;}#pcm-p .pcm-e {  width: 8px;  height: 8px;  z-index: 101;}#pcm-sc-1 {  left: 18px;  top: 16px;  width: 8px;  height: 56px;  position: absolute;  overflow: hidden;}#pcm-sc-2 {  left: 18px;  top: 80px;  width: 8px;  height: 56px;  position: absolute;  overflow: hidden;}#pcm-le {  position: absolute;  left: 515px;  top: 74px;  height: 64px;  width: 32px;} #pcm-le div {  position: relative;}#pcm-sc-1-l {    left: -2px;  top: 0;  width: 48px;  height: 8px;}#pcm-sc-2-l {    left: -2px;  top: 64px;  width: 48px;  height: 8px;}#pcm-so {  left: 7px;  top: 116px;  width: 12px;  height: 12px;  border: 8px solid black;  cursor: pointer;}#pcm-li {  position: absolute;  left: 523px;  top: 0;  height: 80px;  width: 16px;}#pcm-li .pcm-lif {  position: relative;  width: 16px;  height: 12px;  margin-bottom: 3px;}#pcm-p.blk .pcm-e {  visibility: hidden;}#pcm-c .pcm-ac {  width: 16px;  height: 16px;  margin-left: -4px;  margin-top: -4px;  z-index: 110;}#pcm-c .pcm-n {  z-index: 111;}#pcm-c #pcm-stck {  z-index: 109;}#pcm-c #pcm-gbug {  width: 32px;}#pcm-c #pcm-bpcm {  width: 32px;  height: 32px;  margin-left: -20px;  margin-top: -20px;}#pcm-f,#pcm-le div {  width: 32px;  height: 16px;  z-index: 105;}#pcm-f {  margin-left: -8px;  margin-top: -4px;}#pcm-do {  width: 19px;  height: 2px;  left: 279px;  top: 46px;  overflow: hidden;  position: absolute;  background: #ffaaa5;}#pcm-re {  width: 48px;  height: 8px;  z-index: 120;  left: 264px;  top: 80px;}#pcm-go {  width: 80px;  height: 8px;  z-index: 120;  left: 248px;  top: 80px;}";
            g.styleElement =
                document.createElement("style");
            g.styleElement.type = "text/css";
            if (g.styleElement.styleSheet) g.styleElement.styleSheet.cssText = b;
            else g.styleElement.appendChild(document.createTextNode(b));
            document.getElementsByTagName("head")[0].appendChild(g.styleElement)
        };
        g.createCanvasElement = function() {
            g.canvasEl = document.createElement("div");
            g.canvasEl.id = "pcm-c";
            g.canvasEl.hideFocus = a;
            document.getElementById("logo").appendChild(g.canvasEl);
            g.canvasEl.tabIndex = 0;
            g.canvasEl.focus()
        };
        g.everythingIsReady = function() {
            if (!g.ready) {
                g.ready = a;
                var b = document.getElementById("logo-l");
                google.dom.remove(b);
                //document.getElementById("logo").style.background = "black";
                g.addCss();
                g.createCanvasElement();
                g.speedIntervals = [];
                g.oppositeDirections = [];
                g.oppositeDirections[1] = 2;
                g.oppositeDirections[2] = 1;
                g.oppositeDirections[4] = 8;
                g.oppositeDirections[8] = 4;
                g.addEventListeners();
                g.fpsChoice = 0;
                g.canDecreaseFps = a;
                g.initializeTickTimer();
                g.newGame()
            }
        };
        g.checkIfEverythingIsReady = function() {
            if (g.soundReady || g.graphicsReady) g.updateLoadingProgress(0.67);
            if (g.soundReady && g.graphicsReady) {
                g.updateLoadingProgress(1);
                g.everythingIsReady()
            }
        };
        g.preloadImage = function(b) {
            var c = new Image,
                d = google.browser.engine.IE;
            if (!d) c.onload = g.imageLoaded;
            c.src = b;
            d && g.imageLoaded()
        };
        g.imageLoaded = function() {
            g.graphicsReady = a;
            g.checkIfEverythingIsReady()
        };
        g.prepareGraphics = function() {
            g.graphicsReady = e;
            g.preloadImage(spriteURL)
        };
        g.trimString = function(b) {
            return b.replace(/^[\s\xa0]+|[\s\xa0]+$/g, "")
        };
        g.g = function(b, c) {
            if (b < c) return -1;
            else if (b > c) return 1;
            return 0
        };
        g.compareVersions = function(b, c) {
            for (var d = 0, f = g.trimString(String(b)).split("."), h = g.trimString(String(c)).split("."), j = Math.max(f.length, h.length), k = 0; d == 0 && k < j; k++) {
                var x = f[k] || "",
                    F = h[k] || "",
                    G = new RegExp("(\\d*)(\\D*)", "g"),
                    H = new RegExp("(\\d*)(\\D*)", "g");
                do {
                    var t = G.exec(x) || ["", "", ""],
                        u = H.exec(F) || ["", "", ""];
                    if (t[0].length == 0 && u[0].length == 0) break;
                    d = t[1].length == 0 ? 0 : parseInt(t[1], 10);
                    var I = u[1].length == 0 ? 0 : parseInt(u[1], 10);
                    d = g.g(d, I) || g.g(t[2].length == 0, u[2].length == 0) || g.g(t[2], u[2])
                } while (d == 0)
            }
            return d
        };
        g.getFlashVersion = function(b) {
            b = b.match(/[\d]+/g);
            b.length = 3;
            return b.join(".")
        };
        g.detectFlash = function() {
            var b = e,
                c = "";
            if (navigator.plugins && navigator.plugins.length) {
                var d = navigator.plugins["Shockwave Flash"];
                if (d) {
                    b = a;
                    if (d.description) c = g.getFlashVersion(d.description)
                }
                if (navigator.plugins["Shockwave Flash 2.0"]) {
                    b = a;
                    c = "2.0.0.11"
                }
            } else if (navigator.mimeTypes && navigator.mimeTypes.length) {
                if (b = (d = navigator.mimeTypes["application/x-shockwave-flash"]) && d.enabledPlugin) {
                    c = d.enabledPlugin.description;
                    c = g.getFlashVersion(c)
                }
            } else try {
                d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7");
                b = a;
                c = g.getFlashVersion(d.GetVariable("$version"))
            } catch (f) {
                try {
                    d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");
                    b = a;
                    c = "6.0.21"
                } catch (h) {
                    try {
                        d = new ActiveXObject("ShockwaveFlash.ShockwaveFlash");
                        b = a;
                        c = g.getFlashVersion(d.GetVariable("$version"))
                    } catch (j) {}
                }
            }
            g.hasFlash = b;
            g.flashVersion = c
        };
        g.isFlashVersion = function(b) {
            return g.compareVersions(g.flashVersion, b) >= 0
        };
        g.prepareSound = function() {
            g.soundAvailable = e;
            g.soundReady = e;
            g.detectFlash();
            if (!g.hasFlash || !g.isFlashVersion("9.0.0.0")) {
                g.soundReady = a;
                g.checkIfEverythingIsReady()
            } else {
                g.flashIframe = document.createElement("iframe");
                g.flashIframe.name = "pm-sound";
                g.flashIframe.style.position = "absolute";
                g.flashIframe.style.top = "-150px";
                g.flashIframe.style.border = 0;
                g.flashIframe.style.width = "100px";
                g.flashIframe.style.height = "100px";
                google.dom.append(g.flashIframe);
                g.flashIframeDoc = g.flashIframe.contentDocument;
                if (g.flashIframeDoc == undefined || g.flashIframeDoc == null) g.flashIframeDoc = g.flashIframe.contentWindow.document;
                g.flashIframeDoc.open();
                g.flashIframeDoc.write('<html><head></head><body><object classid="clsid:d27cdb6e-ae6d-11cf-96b8-444553540000" codebase="http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=9,0,0,0" width="0" height="0" id="pacman-sound-player" type="application/x-shockwave-flash"> <param name="movie" value="src/swf/pacman10-hp-sound.swf"> <param name="allowScriptAccess" value="always"> <object id="pacman-sound-player-2"  type="application/x-shockwave-flash" data="src/swf/pacman10-hp-sound.swf" width="0" height="0"><param name="allowScriptAccess" value="always"> </object></object></body></html>');
                g.flashIframeDoc.close();
                window.setTimeout(g.flashNotReady, 3E3)
            }
        };
        g.flashNotReady = function() {
            if (!g.ready) {
                g.soundAvailable = e;
                g.soundReady = a;
                g.checkIfEverythingIsReady()
            }
        };
        g.flashReady = function(b) {
            g.flashSoundPlayer = b;
            g.soundAvailable = a;
            g.soundReady = a;
            g.checkIfEverythingIsReady()
        };
        g.flashLoaded = function() {
            if (g.flashIframeDoc) {
                var b = g.flashIframeDoc.getElementById("pacman-sound-player");
                if (b && b.playTrack) {
                    g.flashReady(b);
                    return
                } else if ((b = g.flashIframeDoc.getElementById("pacman-sound-player-2")) && b.playTrack) {
                    g.flashReady(b);
                    return
                }
            }
            g.flashNotReady()
        };
        g.destroy = function() {
            if (google.pacman) {
                g.stopAllAudio();
                window.clearInterval(g.tickTimer);
                window.clearInterval(g.dotTimer);
                window.clearInterval(g.dotTimerMs);
                google.dom.remove(g.styleElement);
                google.dom.remove(g.flashIframe);
                google.dom.remove(g.canvasEl);
                google.pacman = undefined
            }
        };
        g.exportFunctionCalls = function() {
            google.pacman = {};
            google.pacman.insertCoin = g.insertCoin;
            google.pacman.startGameplay = g.startGameplay;
            google.pacman.flashLoaded = g.flashLoaded;
            google.pacman.destroy = g.destroy
            google.pacman.keyPressed = g.keyPressed;
        };
        g.updateLoadingProgress = function(b) {
            b = Math.round(b * 200);
            document.getElementById("logo-b").style.width = b + "px"
        };
        g.init = function() {
            g.ready = e;
            document.getElementById("logo").title = "";
            g.updateLoadingProgress(0.33);
            g.exportFunctionCalls();
            g.useCss = navigator.userAgent.indexOf("MSIE 5.") != -1 || navigator.userAgent.indexOf("MSIE 6.") != -1 || navigator.userAgent.indexOf("MSIE 7.") != -1 ? e : a;
            g.prepareGraphics();
            g.prepareSound()
        };
        g.init();
}();