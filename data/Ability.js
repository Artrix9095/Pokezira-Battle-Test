import DT from "./types/DataTypes";

/*
  A calling should look like this
*/
/*var p = {
  Field: BattleField,
  User: User.Team, // this could be the npc, or the hero
  Opp: Opp.Team,
  custom: {
    ownerPokemon: 0, // a team is a list of slots, this is simply the slot
    defenderPokemon: 5,
    Opp: {
      MoveData: {
        Total: 180,
        Hits: 1,
        Move: {
          BasePower: 120,
          Type: "Fighting",
          Move: "Close_Combat"
        }
      }
    },
    User: {
      MoveData: {
        Total: 210,
        Hits: 5,
        Move: {
          BasePower: 15,
          Type: "Rock",
          Move: "Rock_Blast"
        }
      }
    }
  }
};*/
// this var is only a example the data on it is not valid
//Xtra.Abilities[ability.replace(" ", "_")](p);

export default function Ability() {
  var checks = DT();
  return {
    /*
      p is a object with:
        Opp and User Object, and Owner pokemon string, with Defenderpokemon string and
        a few other objects
    */
    Speed_Boost: function(p) {
      if (checks.after_turn(p)) {
        p.User[p.custom.ownerPokemon].Stats.Speed *= 1.5;
        return true;
      } else {
        return false;
      }
    },
    Sturdy: function(p) {
      var dmg = p.custom.Opp.MoveData;
      p = p.User[p.custom.ownerPokemon];
      if (p.Stats.HP === p.BaseHP) {
        if (dmg.Total >= p.BaseHP) {
          if (dmg.Hits === 1) {
            p.Stats.HP = 1;
            return true;
          } else {
            return false;
          }
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    Levitate: function(p) {
      if (p.custom.Opp.MoveData.Move.Type === "Ground") {
        p.custom.Opp.MoveData.Total = 0;
        return true;
      } else {
        return false;
      }
    },
    Hailstorm: function(p) {
      p.Field.Weather.Name = "Hailstorm";
      if (p.User[p.custom.ownerPokemon].Item === "Hail_Rock") {
        p.Field.Weather.Turns = 7;
        return true;
      } else {
        p.Field.Weather.Turns = 5;
        return true;
      }
    }
  };
}
