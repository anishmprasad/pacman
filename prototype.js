import * as variable from './variables'
const { A, B, C, D, a, e, g, i, l, m, n, o, p, q, r, s, v, w, y, z } = variable

export default function E(b) {
  this.id = b
}
E.prototype.A = function () {
  var b = r[g.playerCount][this.id];
  this.pos = [b.y * 8, b.x * 8];
  this.posDelta = [0, 0];
  this.tilePos = [b.y * 8, b.x * 8];
  this.targetPos = [b.scatterY * 8, b.scatterX * 8];
  this.scatterPos = [b.scatterY * 8, b.scatterX * 8];
  this.lastActiveDir = this.dir = b.dir;
  this.physicalSpeed = this.requestedDir = this.nextDir = 0;
  this.c(0);
  this.reverseDirectionsNext = this.freeToLeavePen = this.modeChangedWhileInPen = this.eatenInThisFrightMode = e;
  this.l()
};
E.prototype.createElement = function () {
  this.el = document.createElement("div");
  this.el.className = "pcm-ac";
  this.el.id = "actor" + this.id;
  g.prepareElement(this.el, 0, 0);
  g.playfieldEl.appendChild(this.el);
  this.elPos = [0, 0];
  this.elBackgroundPos = [0, 0]
};
E.prototype.a = function (b) {
  var c = this.mode;
  this.mode = b;
  if (this.id == g.playerCount + 3 && (b == 16 || c == 16)) g.updateCruiseElroySpeed();
  switch (c) {
    case 32:
      g.ghostExitingPenNow = e;
      break;
    case 8:
      g.ghostEyesCount > 0 && g.ghostEyesCount--;
      g.ghostEyesCount == 0 && g.playAmbientSound();
      break
  }
  switch (b) {
    case 4:
      this.fullSpeed = g.levels.ghostFrightSpeed * 0.8;
      this.tunnelSpeed = g.levels.ghostTunnelSpeed * 0.8;
      this.followingRoutine = e;
      break;
    case 1:
      this.fullSpeed = g.levels.ghostSpeed * 0.8;
      this.tunnelSpeed = g.levels.ghostTunnelSpeed * 0.8;
      this.followingRoutine =
        e;
      break;
    case 2:
      this.targetPos = this.scatterPos;
      this.fullSpeed = g.levels.ghostSpeed * 0.8;
      this.tunnelSpeed = g.levels.ghostTunnelSpeed * 0.8;
      this.followingRoutine = e;
      break;
    case 8:
      this.tunnelSpeed = this.fullSpeed = 1.6;
      this.targetPos = [s[0], s[1]];
      this.freeToLeavePen = this.followingRoutine = e;
      break;
    case 16:
      this.l();
      this.followingRoutine = a;
      this.routineMoveId = -1;
      switch (this.id) {
        case g.playerCount + 1:
          this.routineToFollow = 2;
          break;
        case g.playerCount + 2:
          this.routineToFollow = 1;
          break;
        case g.playerCount + 3:
          this.routineToFollow =
            3;
          break
      }
      break;
    case 32:
      this.followingRoutine = a;
      this.routineMoveId = -1;
      switch (this.id) {
        case g.playerCount + 1:
          this.routineToFollow = 5;
          break;
        case g.playerCount + 2:
          this.routineToFollow = 4;
          break;
        case g.playerCount + 3:
          this.routineToFollow = 6;
          break
      }
      g.ghostExitingPenNow = a;
      break;
    case 64:
      this.followingRoutine = a;
      this.routineMoveId = -1;
      switch (this.id) {
        case g.playerCount:
        case g.playerCount + 1:
          this.routineToFollow = 8;
          break;
        case g.playerCount + 2:
          this.routineToFollow = 7;
          break;
        case g.playerCount + 3:
          this.routineToFollow = 9;
          break
      }
      break;
    case 128:
      this.followingRoutine = a;
      this.routineMoveId = -1;
      switch (this.id) {
        case g.playerCount:
        case g.playerCount + 1:
          this.routineToFollow = 11;
          break;
        case g.playerCount + 2:
          this.routineToFollow = 10;
          break;
        case g.playerCount + 3:
          this.routineToFollow = 12;
          break
      }
      break
  }
  this.d()
};
E.prototype.l = function () {
  if (this.id >= g.playerCount) {
    this.targetPlayerId = Math.floor(g.rand() * g.playerCount)
  }
};
E.prototype.z = function (b) {
  if (!g.userDisabledSound) {
    google.pacManSound = a;
    g.updateSoundIcon()
  }
  if (this.dir == g.oppositeDirections[b]) {
    this.dir = b;
    this.posDelta = [0, 0];
    this.currentSpeed != 2 && this.c(0);
    if (this.dir != 0) this.lastActiveDir = this.dir;
    this.nextDir = 0
  } else if (this.dir != b) {
    if (this.dir == 0) {
      if (g.playfield[this.pos[0]][this.pos[1]].allowedDir & b) this.dir = b
    } else {
      var c = g.playfield[this.tilePos[0]][this.tilePos[1]];
      if (c && c.allowedDir & b) {
        c = l[this.dir];
        var d = [this.pos[0], this.pos[1]];
        d[c.axis] -= c.increment;
        var f = 0;
        if (d[0] == this.tilePos[0] && d[1] == this.tilePos[1]) f = 1;
        else {
          d[c.axis] -= c.increment;
          if (d[0] == this.tilePos[0] && d[1] == this.tilePos[1]) f = 2
        }
        if (f) {
          this.dir = b;
          this.pos[0] = this.tilePos[0];
          this.pos[1] = this.tilePos[1];
          c = l[this.dir];
          this.pos[c.axis] += c.increment * f;
          return
        }
      }
      this.nextDir = b;
      this.posDelta = [0, 0]
    }
  }
};
E.prototype.i = function (b) {
  var c = this.tilePos,
    d = l[this.dir],
    f = [c[0], c[1]];
  f[d.axis] += d.increment * 8;
  var h = g.playfield[f[0]][f[1]];
  if (b && !h.intersection) h = g.playfield[c[0]][c[1]];
  if (h.intersection) switch (this.mode) {
    case 2:
    case 1:
    case 8:
      if ((this.dir & h.allowedDir) == 0 && h.allowedDir == g.oppositeDirections[this.dir]) this.nextDir = g.oppositeDirections[this.dir];
      else {
        b = 99999999999;
        c = 0;
        for (var j in i) {
          var k = i[j];
          if (h.allowedDir & k && this.dir != g.oppositeDirections[k]) {
            d = l[k];
            var x = [f[0], f[1]];
            x[d.axis] += d.increment;
            d = g.getDistance(x, [this.targetPos[0], this.targetPos[1]]);
            if (d < b) {
              b = d;
              c = k
            }
          }
        }
        if (c) this.nextDir = c
      }
      break;
    case 4:
      if ((this.dir & h.allowedDir) == 0 && h.allowedDir == g.oppositeDirections[this.dir]) this.nextDir = g.oppositeDirections[this.dir];
      else {
        do f = i[Math.floor(g.rand() * 4)];
        while ((f & h.allowedDir) == 0 || f == g.oppositeDirections[this.dir]);
        this.nextDir = f
      }
      break
  }
};
E.prototype.p = function (b) {
  g.tilesChanged = a;
  if (this.reverseDirectionsNext) {
    this.dir = g.oppositeDirections[this.dir];
    this.nextDir = 0;
    this.reverseDirectionsNext = e;
    this.i(a)
  }
  if (!this.ghost && !g.playfield[b[0]][b[1]].path) {
    this.pos[0] = this.lastGoodTilePos[0];
    this.pos[1] = this.lastGoodTilePos[1];
    b[0] = this.lastGoodTilePos[0];
    b[1] = this.lastGoodTilePos[1];
    this.dir = 0
  } else this.lastGoodTilePos = [b[0], b[1]];
  g.playfield[b[0]][b[1]].type == 1 && this.mode != 8 ? this.c(2) : this.c(0);
  !this.ghost && g.playfield[b[0]][b[1]].dot && g.dotEaten(this.id, b);
  this.tilePos[0] = b[0];
  this.tilePos[1] = b[1];
};
E.prototype.t = function () {
  var b = this.tilePos;
  switch (this.dir) {
    case 1:
      var c = [b[0], b[1]],
        d = [b[0] + 3.6, b[1]];
      break;
    case 2:
      c = [b[0] - 4, b[1]];
      d = [b[0], b[1]];
      break;
    case 4:
      c = [b[0], b[1]];
      d = [b[0], b[1] + 3.6];
      break;
    case 8:
      c = [b[0], b[1] - 4];
      d = [b[0], b[1]];
      break
  }
  if (this.pos[0] >= c[0] && this.pos[0] <= d[0] && this.pos[1] >= c[1] && this.pos[1] <= d[1]) {
    b = l[this.nextDir];
    this.posDelta[b.axis] += b.increment
  }
};
E.prototype.n = function () {
  if (this.pos[0] == q[0].y * 8 && this.pos[1] == q[0].x * 8) {
    this.pos[0] = q[1].y * 8;
    this.pos[1] = (q[1].x - 1) * 8
  } else if (this.pos[0] == q[1].y * 8 && this.pos[1] == q[1].x * 8) {
    this.pos[0] = q[0].y * 8;
    this.pos[1] = (q[0].x + 1) * 8
  }
  this.mode == 8 && this.pos[0] == s[0] && this.pos[1] == s[1] && this.a(64);
  if (!this.ghost && this.pos[0] == v[0] && (this.pos[1] == v[1] || this.pos[1] == v[1] + 8)) {
    g.eatFruit(this.id)
    console.log('eatFruit')
  }
  // console.log('positions =>', this.pos[0],this.pos[1])
};
E.prototype.u = function () {
  this.n();
  this.ghost && this.i(e);
  var b = g.playfield[this.pos[0]][this.pos[1]];
  if (b.intersection) {
    if (this.nextDir && this.nextDir & b.allowedDir) {
      if (this.dir != 0) this.lastActiveDir = this.dir;
      this.dir = this.nextDir;
      this.nextDir = 0;
      if (!this.ghost) {
        this.pos[0] += this.posDelta[0];
        this.pos[1] += this.posDelta[1];
        this.posDelta = [0, 0]
      }
    } else if ((this.dir & b.allowedDir) == 0) {
      if (this.dir != 0) {
        this.lastActiveDir = this.dir;
      }
      this.nextDir = this.dir = 0;
      this.c(0)
    }
  }
  // console.log('lastActiveDir =>', this.lastActiveDir)            
};
E.prototype.o = function () {
  var b = this.pos[0] / 8,
    c = this.pos[1] / 8,
    d = [Math.round(b) * 8, Math.round(c) * 8];
  if (d[0] != this.tilePos[0] || d[1] != this.tilePos[1]) {
    this.p(d);
  } else {
    b = [Math.floor(b) * 8, Math.floor(c) * 8];
    this.pos[1] == b[1] && this.pos[0] == b[0] && this.u()
  }
  !this.ghost && this.nextDir && g.playfield[d[0]][d[1]].intersection && this.nextDir & g.playfield[d[0]][d[1]].allowedDir && this.t()
};
E.prototype.B = function () {
  if (this.id == g.playerCount && g.dotsRemaining < g.levels.elroyDotsLeftPart1 && this.mode == 2 && (!g.lostLifeOnThisLevel || g.actors[g.playerCount + 3].mode != 16)) {
    var b = g.actors[this.targetPlayerId];
    this.targetPos = [b.tilePos[0], b.tilePos[1]]
  } else if (this.ghost && this.mode == 1) {
    b = g.actors[this.targetPlayerId];
    switch (this.id) {
      case g.playerCount:
        this.targetPos = [b.tilePos[0], b.tilePos[1]];
        break;
      case g.playerCount + 1:
        this.targetPos = [b.tilePos[0], b.tilePos[1]];
        var c = l[b.dir];
        this.targetPos[c.axis] += 32 * c.increment;
        if (b.dir == 1) this.targetPos[1] -= 32;
        break;
      case g.playerCount + 2:
        var d = g.actors[g.playerCount],
          f = [b.tilePos[0], b.tilePos[1]];
        c = l[b.dir];
        f[c.axis] += 16 * c.increment;
        if (b.dir == 1) f[1] -= 16;
        this.targetPos[0] = f[0] * 2 - d.tilePos[0];
        this.targetPos[1] = f[1] * 2 - d.tilePos[1];
        break;
      case g.playerCount + 3:
        c = g.getDistance(b.tilePos, this.tilePos);
        this.targetPos = c > 64 ? [b.tilePos[0], b.tilePos[1]] : this.scatterPos;
        break
    }
  }
};
E.prototype.v = function () {
  this.routineMoveId++;
  if (this.routineMoveId == A[this.routineToFollow].length)
    if (this.mode == 16 && this.freeToLeavePen && !g.ghostExitingPenNow) {
      this.eatenInThisFrightMode ? this.a(128) : this.a(32);
      return
    } else if (this.mode == 32 || this.mode == 128) {
      this.pos = [s[0], s[1] + 4];
      this.dir = this.modeChangedWhileInPen ? 8 : 4;
      var b = g.mainGhostMode;
      if (this.mode == 128 && b == 4) b = g.lastMainGhostMode;
      this.a(b);
      return
    } else if (this.mode == 64) {
      if (this.id == g.playerCount || this.freeToLeavePen) this.a(128);
      else {
        this.eatenInThisFrightMode =
          a;
        this.a(16)
      }
      return
    } else this.routineMoveId = 0;
  b = A[this.routineToFollow][this.routineMoveId];
  this.pos[0] = b.y * 8;
  this.pos[1] = b.x * 8;
  this.dir = b.dir;
  this.physicalSpeed = 0;
  this.speedIntervals = g.getSpeedIntervals(b.speed);
  this.proceedToNextRoutineMove = e;
  this.b()
};
E.prototype.m = function () {
  var b = A[this.routineToFollow][this.routineMoveId];
  if (b) {
    if (this.speedIntervals[g.intervalTime]) {
      var c = l[this.dir];
      this.pos[c.axis] += c.increment;
      switch (this.dir) {
        case 1:
        case 4:
          if (this.pos[c.axis] < b.dest * 8) {
            this.pos[c.axis] = b.dest * 8;
            this.proceedToNextRoutineMove = a
          }
          break;
        case 2:
        case 8:
          if (this.pos[c.axis] > b.dest * 8) {
            this.pos[c.axis] = b.dest * 8;
            this.proceedToNextRoutineMove = a
          }
          break
      }
      this.b()
    }
  }
};
E.prototype.j = function () {
  if (this.routineMoveId == -1 || this.proceedToNextRoutineMove) {
    this.v();
  }
  this.m()
};
E.prototype.d = function () {
  switch (this.currentSpeed) {
    case 0:
      var b = this.id == g.playerCount && (this.mode == 2 || this.mode == 1) ? g.cruiseElroySpeed : this.fullSpeed;
      break;
    case 1:
      b = this.dotEatingSpeed;
      break;
    case 2:
      b = this.tunnelSpeed;
      break
  }
  if (this.physicalSpeed != b) {
    this.physicalSpeed = b;
    this.speedIntervals = g.getSpeedIntervals(this.physicalSpeed)
  }
  // console.log('currentSpeed.d',this.currentSpeed)
  // console.log('physicalSpeed', this.physicalSpeed)
};
E.prototype.c = function (b) {
  // console.log('currentSpeed.c', b)          
  this.currentSpeed = b;
  this.d()
};
E.prototype.e = function () {
  if (this.dir) {
    if (this.speedIntervals[g.intervalTime]) {
      var b = l[this.dir];
      this.pos[b.axis] += b.increment;
      this.o();
      this.b()
    }
  }
};
E.prototype.move = function () {
  if (g.gameplayMode == 0 || this.ghost && g.gameplayMode == 1 && (this.mode == 8 || this.mode == 64)) {
    if (this.requestedDir != 0) {
      this.z(this.requestedDir);
      this.requestedDir = 0
    }
    if (this.followingRoutine) {
      this.j();
      this.mode == 64 && this.j()
    } else {
      this.e();
      this.mode == 8 && this.e()
    }
  }
};
E.prototype.k = function () {
  var b = g.getPlayfieldX(this.pos[1] + this.posDelta[1]),
    c = g.getPlayfieldY(this.pos[0] + this.posDelta[0]);
  if (this.elPos[0] != c || this.elPos[1] != b) {
    this.elPos[0] = c;
    this.elPos[1] = b;
    this.el.style.left = b + "px";
    this.el.style.top = c + "px"
  }
};
E.prototype.s = function () {
  var b = 0,
    c = 0,
    d = this.dir;
  if (d == 0) d = this.lastActiveDir;
  if (g.gameplayMode == 1 && this.id == g.playerEatingGhostId) {
    b = 3;
    c = 0
  } else if ((g.gameplayMode == 9 || g.gameplayMode == 10) && this.id == 0) {
    b = 2;
    c = 0
  } else if (g.gameplayMode == 4 || g.gameplayMode == 5 || g.gameplayMode == 7) {
    b = this.id == 0 ? 2 : 4;
    c = 0
  } else if (g.gameplayMode == 3)
    if (this.id == g.playerDyingId) {
      d = 20 - Math.floor(g.gameplayModeTime / g.timing[4] * 21);
      if (this.id == 0) {
        b = d - 1;
        switch (b) {
          case -1:
            b = 0;
            break;
          case 11:
            b = 10;
            break;
          case 12:
          case 13:
          case 14:
          case 15:
          case 16:
          case 17:
          case 18:
          case 19:
          case 20:
            b =
              11;
            break
        }
        c = 12
      } else switch (d) {
        case 0:
        case 1:
        case 2:
        case 6:
        case 10:
          b = 4;
          c = 3;
          break;
        case 3:
        case 7:
        case 11:
          b = 4;
          c = 0;
          break;
        case 4:
        case 8:
        case 12:
        case 13:
        case 14:
        case 15:
        case 16:
        case 17:
        case 18:
        case 19:
        case 20:
          b = 4;
          c = 2;
          break;
        case 5:
        case 9:
          b = 4;
          c = 1;
          break
      }
    } else {
      b = 3;
      c = 0
    } else if (this.el.id == "pcm-bpcm") {
      b = 14;
      c = 0;
      d = Math.floor(g.globalTime * 0.2) % 4;
      if (d == 3) d = 1;
      c += 2 * d
    } else {
    switch (d) {
      case 4:
        c = 0;
        break;
      case 8:
        c = 1;
        break;
      case 1:
        c = 2;
        break;
      case 2:
        c = 3;
        break
    }
    if (g.gameplayMode != 2) b = Math.floor(g.globalTime * 0.3) % 4;
    if (b == 3 && this.dir == 0) b = 0;
    if (b == 2 && this.id == 0) b = 0;
    if (b == 3) {
      b = 2;
      if (this.id == 0) c = 0
    }
    if (this.id == 1) b += 4
  }
  return [c, b]
};
E.prototype.r = function () {
  var b = 0,
    c = 0;
  if (g.gameplayMode == 10 || g.gameplayMode == 4 || g.gameplayMode == 3) {
    b = 3;
    c = 0
  } else if (g.gameplayMode == 1 && this.id == g.ghostBeingEatenId) {
    switch (g.modeScoreMultiplier) {
      case 2:
        b = 0;
        break;
      case 4:
        b = 1;
        break;
      case 8:
        b = 2;
        break;
      case 16:
        b = 3;
        break
    }
    c = 11;
    this.el.className = "pcm-ac pcm-n"
  } else if (this.mode == 4 || (this.mode == 16 || this.mode == 32) && g.mainGhostMode == 4 && !this.eatenInThisFrightMode) {
    b = 0;
    c = 8;
    if (g.frightModeTime < g.levels.frightTotalTime - g.levels.frightTime && Math.floor(g.frightModeTime / g.timing[1]) % 2 == 0) b += 2;
    b += Math.floor(g.globalTime / 16) % 2
  } else if (this.mode == 8 || this.mode == 64) {
    c = this.nextDir;
    if (!c) c = this.dir;
    switch (c) {
      case 4:
        b = 2;
        break;
      case 8:
        b = 3;
        break;
      case 1:
        b = 0;
        break;
      case 2:
        b = 1;
        break
    }
    c = 10
  } else if (this.el.id == "pcm-ghin") {
    b = 6;
    c = 8;
    b += Math.floor(g.globalTime / 16) % 2
  } else if (this.el.id == "pcm-gbug") {
    b = 6;
    c = 9;
    c += Math.floor(g.globalTime / 16) % 2
  } else if (this.el.id == "pcm-ghfa") {
    b = g.cutsceneSequenceId == 3 ? 6 : 7;
    c = 11
  } else if (this.el.id == "pcm-stck") {
    b = g.cutsceneSequenceId == 1 ? g.cutsceneTime > 60 ? 1 : g.cutsceneTime > 45 ? 2 : 3 : g.cutsceneSequenceId == 2 ? 3 : g.cutsceneSequenceId == 3 || g.cutsceneSequenceId == 4 ? 4 : 0;
    c = 13
  } else {
    c = this.nextDir;
    if (!c || g.playfield[this.tilePos[0]][this.tilePos[1]].type == 1) c = this.dir;
    switch (c) {
      case 4:
        b = 4;
        break;
      case 8:
        b = 6;
        break;
      case 1:
        b = 0;
        break;
      case 2:
        b = 2;
        break
    }
    c = 4 + this.id - g.playerCount;
    if (this.speed > 0 || g.gameplayMode != 13) b += Math.floor(g.globalTime / 16) % 2
  }
  return [c, b]
};
E.prototype.b = function () {
  this.k();
  var b = [0, 0];
  b = g.gameplayMode == 8 || g.gameplayMode == 14 ? [0, 3] : this.ghost ? this.r() : this.s();
  if (this.elBackgroundPos[0] != b[0] || this.elBackgroundPos[1] != b[1]) {
    this.elBackgroundPos[0] = b[0];
    this.elBackgroundPos[1] = b[1];
    b[0] *= 16;
    b[1] *= 16;
    g.changeElementBkPos(this.el, b[1], b[0], a)
  }
};