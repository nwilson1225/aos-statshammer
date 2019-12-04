import uuid from 'uuid/v4';
import {
  TOGGLE_WEAPON_PROFILE, EDIT_WEAPON_PROFILE, ADD_WEAPON_PROFILE, DELETE_WEAPON_PROFILE,
  ADD_UNIT, DELETE_UNIT, EDIT_UNIT_NAME,
} from '../actions/units.action';

const DEFAULT_UNIT = {
  name: 'Unit 1',
  weapon_profiles: [
    {
      active: true,
      num_models: 20,
      attacks: 2,
      to_hit: 3,
      to_wound: 4,
      rend: 1,
      damage: 1,
      modifiers: [],
    },
  ],
};

const updateItemInArray = (array, index, callback) => array.map((item, i) => {
  if (i === index) {
    return callback(item);
  }
  return item;
});

const addWeaponProfile = (state, action) => [
  ...state,
  { ...action.profile },
];

const toggleWeaponProfile = (state, action) => updateItemInArray(state, action.id, (profile) => ({
  ...profile,
  active: !profile.active,
}));

const editWeaponProfile = (state, action) => updateItemInArray(state, action.id, (profile) => ({
  ...profile,
  ...action.profile,
}));

const deleteWeaponProfile = (state, action) => state.filter((_, index) => index !== action.id);

const weaponProfilesReducer = (state, action) => {
  switch (action.type) {
    case TOGGLE_WEAPON_PROFILE:
      return toggleWeaponProfile(state, action);
    case EDIT_WEAPON_PROFILE:
      return editWeaponProfile(state, action);
    case ADD_WEAPON_PROFILE:
      return addWeaponProfile(state, action);
    case DELETE_WEAPON_PROFILE:
      return deleteWeaponProfile(state, action);
    default:
      return state;
  }
};

const unitReducer = (state = DEFAULT_UNIT, action) => {
  switch (action.type) {
    default:
      return {
        ...state,
        weapon_profiles: weaponProfilesReducer(state.weapon_profiles, action),
      };
  }
};

const INITIAL_STATE = [{ ...DEFAULT_UNIT, uuid: uuid() }];

const unitsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ADD_UNIT:
      return [
        ...state,
        {
          ...action.unit,
          uuid: uuid(),
        },
      ];
    case DELETE_UNIT:
      return state.filter((_, index) => index !== action.unitId);
    case EDIT_UNIT_NAME:
      return updateItemInArray(state, action.unitId, (unit) => ({
        ...unit,
        name: action.name,
      }));
    default:
      if (action && typeof action.unitId === 'number') {
        return state.map((unit, index) => {
          if (index === action.unitId) {
            return unitReducer(unit, action);
          }
          return unit;
        });
      }
      return state;
  }
};

export default unitsReducer;
