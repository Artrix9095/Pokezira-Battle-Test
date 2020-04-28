export default function DT() {
  var types = {
    on_attack: function(p) {
      if (p.Hero[p.custom.ownerPokemon].IsTurn === true) {
        return true;
      } else {
        return false;
      }
    },
    on_hit: function(p) {
      if (p.User[p.custom.ownerPokemon].IsTurn === false) {
        if (!(p.custom.Opp.MoveData.Total in [null, 0])) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    },
    on_death: function(p) {
      if (p.User[p.custom.ownerPokemon].Stats.HP === 0) {
        return true;
      } else {
        return false;
      }
    },
    after_turn: function(p) {
      if (p.User[p.custom.ownerPokemon].IsTurn === false) {
        if (p.User[p.custom.ownerPokemon].IsTurn === false) {
          return true;
        } else {
          return false;
        }
      } else {
        return false;
      }
    }
  };
  return types;
}
