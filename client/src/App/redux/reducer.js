import {shuffle, sample} from 'underscore';
import theme from '../theme';
import { combineReducers } from 'redux';

import counterpart from 'counterpart';

// general

const setTheme = (state, theme) => ({ ...state, ...theme});

const initialThemeState = {...theme};

const themeReducer = (state = initialThemeState, action) => {
  switch (action.type){
    case 'SET_THEME':
      return setTheme(state, action.payload);
    default: 
      return state;
  }
}


// user

const login = (state, user) => { 
  return ({ ...state, ...user });
};

const logout = () => ({});

const logState = (state) => {
  console.log(state)
  return state;
}

const userReducer = (state = {}, action) => {
  switch (action.type){
    case 'LOGIN':
      return login(state, action.payload);
    case 'LOGOUT':
      return logout(state);
    case 'LOG_STATE':
      return logState(state);
    default: 
      return state;
  }
} 

// notebook

const setNewWords = (state, wordList) => ({...state, newWords: wordList.sort((a, b) => {return a.internationalName > b.internationalName;}) || [] })

const setNewWordLists = (state, wordLists) => {
  return ({...state, newWordLists: wordLists});
};

const setWordPreview = (state, word) => ({ ...state, wordPreview: word });

const openWordPreview = state => ({ ...state, openWordPreview: true });

const toggleWordPreview = state => ({ ...state, openWordPreview: !state.openWordPreview });

const initialDictionaryState = {
  newWords: [],
  newWordList: {},
  selectedWords: [],
  wordPreview: {},
}

const dictionaryReducer = (state = initialDictionaryState, action) => {
  switch (action.type) {
    case 'SET_NEW_WORDS':
      return setNewWords(state, action.payload);
    case 'SET_NEW_WORD_LISTS':
      return setNewWordLists(state, action.payload);  
    case 'OPEN_WORD_PREVIEW':
      return openWordPreview(state);
    case 'TOGGLE_WORD_PREVIEW':
      return toggleWordPreview(state);
    default: 
      return state;
  }
}

// login modal

const toggleLoginModal = state => ({ ...state, open: !state.open });

const changeLoginModalTab = (state, tabNumber) => ({ ...state, tab: tabNumber });

const initialLoginModalState = {
  open: false,
  tab: 1,
}

const loginModalReducer = (state = initialLoginModalState, action) => {
  switch (action.type) {
    case 'TOGGLE_LOGIN_MODAL':
      return toggleLoginModal(state);
    case 'CHANGE_LOGIN_MODAL_TAB':
      return changeLoginModalTab(state, action.payload);
    default: 
      return state;
  }
}

// nav snackbar

const toggleNavSnackbar = state => ({ ...state, open: !state.open });

const setnavSnackbar = (state, variant, message) => ({ ...state, variant, message });

const initialNavSnackbarState = {
  open: false,
  variant: 'success',
  message: 'Success !'
}

const navSnackbarReducer = (state = initialNavSnackbarState, action) => {
  switch (action.type) {
    case 'TOGGLE_NAV_SNACKBAR':
      return toggleNavSnackbar(state);
    case 'SET_NAV_SNACKBAR':
      return setnavSnackbar(state, action.payload.variant, action.payload.message);
    default: 
      return state;
  }
}

// exercice

function getTurnData(cards){
  const allTranslations = cards.reduce(function(p,c,i){
    return p.concat(c.translations);
  }, []);
  const fourRandomTranslations = shuffle(allTranslations).slice(0, 4);
  const answer = sample(fourRandomTranslations);

  return {
    card: cards.find((card) =>
      card.translations.some((translation) =>
        translation === answer)
    ),
    translations: fourRandomTranslations
  }
}

const answerSelected = (state, answer) => ({ ...state, highlight: state.card.translations.some((tr) => tr === answer) ? 'correct' : 'wrong' });

const exerciceContinue = (state, turnData) => ({ ...state, highlight: '', turnData: getTurnData(state.cards) });

const addCard = (state, card) => ({ ...state, cards: state.cards.concat([card]) });


const initialExerciceState = {};

const exercicesReducer = (state = initialExerciceState, action) => {
  switch (action.type) {
    case 'ANSWER_SELECTED':
      return answerSelected(state, action.payload);
    case 'CONTINUE':
      return exerciceContinue(state, action.payload);
    case 'ADD_CARD':
      return addCard(state, action.payload)
    default: 
      return state;
  }
}



const reducer = combineReducers({
  user: userReducer,
  dictionary: dictionaryReducer,
  loginModal: loginModalReducer,
  navSnackBar: navSnackbarReducer,
  theme: themeReducer,
})

export default reducer;